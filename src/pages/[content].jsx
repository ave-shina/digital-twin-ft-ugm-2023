import React, { useEffect, useRef } from 'react'

import Layout from '@/components/content/Layout'

import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toggleContent, toggleLocation } from 'redux/navigation'
import clsx from 'clsx'
import { Landmarks } from '../components/data/Landamarks'
import Image from 'next/image'

export default function Content() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (router.query.content != undefined) {
      dispatch(toggleContent(router.query.content))
    }
    if (router.query.location != undefined) {
      dispatch(toggleLocation(router.query.location))
    }
  }, [router])

  const navigation = useSelector((state) => state.navigation)
  const data = Landmarks.data.find((item) => item.attributes.objectName === navigation.location)

  const thumbnail = data?.attributes.thumbnail.data.attributes

  // console.log('test redux', navigation.content, navigation.location)
  // console.log('test thumbnail', thumbnail && navigation.content === 'landmark')

  const myRef = useRef()

  useEffect(() => {
    if (!navigation.music) {
      myRef.current.pause()
    } else if (navigation.music) {
      myRef.current.play()
      myRef.current.volume = 0.1
      myRef.current.loop = true
    }
  }, [navigation.music])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        myRef.current.pause()
      } else {
        if (navigation.music) {
          myRef.current.play()
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [navigation.music])

  return (
    <div className='absolute h-full w-full bg-black'>
      <audio ref={myRef} preload='none'>
        <source
          src='https://drive.google.com/uc?authuser=0&id=1nm8IgNlq-mi1jS9W6Pg9UtE1obAaXAGD&export=download'
          type='audio/mpeg'
        />
      </audio>
      <div className={clsx('absolute h-full w-full')}>
        {thumbnail && navigation.content === 'landmark' && (
          <div className='relative h-full w-full'>
            <Image
              src={`${thumbnail.url}`}
              className='h-full w-full'
              alt={thumbnail.name}
              placeholder='blur'
              blurDataURL={'true'}
              height={720}
              width={192}
              unoptimized
            />
          </div>
        )}
      </div>
      {navigation.content != undefined && <Layout></Layout>}
    </div>
  )
}
