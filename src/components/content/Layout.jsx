import React, { useState } from 'react'
import Navbar from './Navbar'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

import Search from './Search'
const Tour = dynamic(() => import('./Tour'), {
  ssr: false,
})
import Faq from './Faq'
import About from './About'
const Location = dynamic(() => import('./Location'), {
  ssr: false,
})

export default function Layout(props) {
  const { content, setContent } = props
  return (
    <>
      {content != '' && (
        <div className='absolute z-10 h-auto  w-full'>
          <div className={clsx('  min-h-[calc(100vh)] w-full bg-white')}>
            <Navbar setContent={setContent}></Navbar>
            <div className={clsx('flex w-full flex-col items-start justify-center  ')}>
              {content === 'search' && <Search></Search>}
              {content === 'tour' && <Tour></Tour>}
              {content === 'faq' && <Faq></Faq>}
              {content === 'about' && <About></About>}
              {content === 'location' && <Location></Location>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
