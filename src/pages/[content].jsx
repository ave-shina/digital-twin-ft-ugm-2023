import React, { useEffect } from 'react'

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

  const thumbnail = data?.attributes.thumbnail.data.attributes.formats.large

  // console.log('test redux', navigation.content, navigation.location)
  // console.log('test thumbnail', thumbnail && navigation.content === 'landmark')

  return (
    <div className='absolute h-full w-full bg-black'>
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
