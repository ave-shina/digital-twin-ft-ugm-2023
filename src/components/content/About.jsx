import React from 'react'
import clsx from 'clsx'

export default function About() {
  return (
    <div className={clsx('flex min-h-[calc(100vh-96px)]  w-full flex-col px-[10%]')}>
      <h1 className={clsx(' mb-2 pb-8 font-medium leading-none text-black', 'text-6xl sm:text-8xl')}>
        Jelajah Teknik.
      </h1>
      <div className={clsx('mb-8 flex h-full w-full flex-col  justify-center ')}>
        <p className={clsx(' mb-8 text-base leading-8 text-black')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Urna porttitor rhoncus dolor purus. Auctor augue mauris augue neque gravida. Sed cras ornare
          arcu dui vivamus arcu felis bibendum ut. Ipsum a arcu cursus vitae congue mauris rhoncus. Enim diam vulputate
          ut pharetra. Eros donec ac odio tempor orci dapibus ultrices. Feugiat vivamus at augue eget arcu. Adipiscing
          elit ut aliquam purus sit amet luctus venenatis lectus. Risus quis varius quam quisque id diam vel quam.
        </p>

        <div className='contributor flex flex-col '>
          <div className='mb-4 flex flex-col'>
            <h6 className='font-medium '>Kontributor</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <div className='flex flex-col'>
            <h6 className='font-medium '>Kontributor</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
