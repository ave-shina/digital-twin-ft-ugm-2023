import React, { useEffect, useState, useRef } from 'react'
const { Pannellum } = require('@georgedrpg/pannellum-react-next')

import '@georgedrpg/pannellum-react-next/es/css/video-js.css'
import '@georgedrpg/pannellum-react-next/es/css/pannellum.css'
import '@georgedrpg/pannellum-react-next/es/css/style-textInfo.css'

import clsx from 'clsx'

export default function ModalPanorama(props) {
  const { currentScene, setCurrentScene, setOpenPanorama, openPanorama, sceneInformation } = props
  const [yaw, setYaw] = useState(0)
  const [pitch, setPitch] = useState(0)
  const panImage = useRef(null)

  const hotspotIcon = (hotSpotDiv) => {
    const image = document.createElement('img')
    image.classList.add('image')
    image.setAttribute('width', '30')
    image.setAttribute('height', '30')
    image.setAttribute('src', 'https://img.icons8.com/material/4ac144/256/camera.png')
    hotSpotDiv.appendChild(image)
  }

  const [sceneObject, setSceneObject] = useState(0)
  useEffect(() => {
    // console.log(currentScene)
    setSceneObject(sceneInformation.find((item) => item.sceneName === currentScene))
    // console.log(sceneObject)
  }, [currentScene])
  // console.log(sceneObject)

  return (
    <div
      id='defaultModal'
      tabindex='-1'
      aria-hidden='true'
      className={clsx(
        'fixed top-0 z-40  !h-screen !w-screen  items-center justify-center',
        openPanorama ? 'flex' : ' hidden',
      )}>
      <div
        onClick={() => {
          setOpenPanorama(false)
        }}
        className={clsx(
          'absolute top-0 z-40 flex !h-screen !w-screen  items-center justify-center   bg-black  bg-opacity-40',
        )}></div>
      <div className={clsx('z-60 absolute z-50 h-[90%] w-full max-w-6xl')}>
        {/* <!-- Modal content --> */}
        <div className={clsx('relative  h-full rounded-lg border-2 border-black bg-white shadow ')}>
          {/* <!-- Modal body --> */}
          <div className={clsx('relativr flex h-max items-center justify-center space-y-6 p-6')}>
            <button
              onClick={() => {
                setOpenPanorama(false)
              }}
              className={clsx(
                'group  absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-solid border-black bg-transparent text-black sm:h-14 sm:w-14 ',
              )}>
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21 21L1 1M21 1L1 21'
                  className={clsx(' stroke-black group-hover:stroke-2')}
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>
            <div className={clsx('flex w-full flex-col items-center justify-center')}>
              <div>
                pitch: {pitch}, yaw: {yaw}, transition:{' '}
              </div>
              {sceneObject && (
                <Pannellum
                  ref={panImage}
                  width='100%'
                  height='500px'
                  image={sceneObject.scenePanoImg}
                  pitch={10}
                  yaw={180}
                  hfov={110}
                  autoLoad
                  showZoomCtrl={false}
                  onMouseup={(event) => {
                    setPitch(panImage.current.getViewer().mouseEventToCoords(event)[0])
                    setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1])
                  }}>
                  {sceneObject.hotSpotsArr.map((hotSpot, index) => {
                    // console.log(hotSpot)
                    return (
                      <Pannellum.Hotspot
                        type='custom'
                        key={index}
                        pitch={hotSpot.pitch}
                        yaw={hotSpot.yaw}
                        tooltip={hotspotIcon}
                        handleClick={(evt, name) => {
                          console.log('halo')
                          setCurrentScene(hotSpot.transition)
                        }}
                        name='image info'
                      />
                    )
                  })}
                </Pannellum>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
