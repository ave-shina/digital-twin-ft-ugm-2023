import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleContent } from 'redux/navigation'
import { useRouter } from 'next/router'
import { FaGift } from 'react-icons/fa'

export default function BottomRight() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleAboutClick = useCallback(() => {
    dispatch(toggleContent('about'))
    router.push(
      {
        pathname: '/',
        query: { content: 'about' },
      },
      '/about',
      { shallow: true },
    )
  }, [dispatch, router])

  return (
    <div className='absolute bottom-10 md:bottom-9 md:right-10 right-6 z-20 flex flex-col'>
      <button
        onClick={handleAboutClick}
        className='about-us group flex  cursor-pointer items-center justify-center rounded-full'>
        <FaGift className='md:w-8 md:h-8 w-7 h-7 fill-white group-hover:fill-black' />
      </button>
    </div>
  )
}
