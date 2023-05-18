import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

// Komponen Peta untuk menggeser dan berinterkasi dengan peta
import { MapInteractionCSS } from 'react-map-interaction'
const { Stage, Layer, Image, Circle } = require('react-konva')

import { useSelector, useDispatch } from 'react-redux'
import { toggleLocation, toggleContent } from 'redux/navigation'

import { useRouter } from 'next/router'
import { Landmarks } from '../data/Landamarks'

function Map(props) {
  const router = useRouter()
  const { setCurrentScene, setOpenPanorama, mapInformation, mapImage, mapName, open, currentIndex } = props
  // set Current Scen digunakan untuk merubah Tampilan Panorama
  // Map Information = Semua titik lokasi dalam satu map
  // Map Image = Gambar Peta

  // Deklarasi Lokasi titik panorama
  const map = []

  // const [landmarksData, setLandmarksData] = useState(null)
  // useEffect(() => {
  //   async function fetchLandmarksData() {
  //     const response = await fetch('http://localhost:1337/api/landmarks?populate=deep')
  //     const data = await response.json()
  //     setLandmarksData(data)
  //   }
  //   fetchLandmarksData()
  // }, [])
  // Deklarasi lokasi titik panorama ketika di halaman tour
  const mapTour = []
  for (let i = 0; i < Landmarks.data.length; i++) {
    mapTour.push({
      name: Landmarks.data[i].attributes.objectName,
      position: Landmarks.data[i].attributes.mapCoordinate,
      isRoute: false,
    })
  }

  const navigation = useSelector((state) => state.navigation)
  for (let i = 0; i < mapInformation.length; i++) {
    map.push({
      x: mapInformation[i].mapCoordinate[0],
      y: mapInformation[i].mapCoordinate[1],
      name: mapInformation[i].name,
      isCrooked: mapInformation[i].isCrooked,
      isRoute: true,
    })
  }

  // Memuat Image Peta
  const [image, setImage] = useState(null)
  useEffect(() => {
    const img = new window.Image()
    img.src = mapImage.url.replace(/\/upload\//, '/upload/w_1000,f_auto,q_auto/')
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setImage(img)
    }
  }, [])

  // Digunakan untuk menengahkan peta ketika di load
  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (mapContainer.current) {
      const containerWidth = mapContainer.current.offsetWidth
      const mapWidth = mapRef.current.offsetWidth
      setValue({ scale: 1, translation: { x: (containerWidth - mapWidth) / 2, y: 0 } })
    }
  }, [open, currentIndex])

  // Efek ketika hover titik di peta
  const [circleName, setcircleName] = useState(mapInformation[0]?.name ? mapInformation[0].name : '')
  const handleMouseEnter = (e, name) => {
    const container = e.target.getStage().container()
    container.style.cursor = 'pointer'
    setcircleName(name)
  }
  const handleMouseLeave = (e, name) => {
    const container = e.target.getStage().container()
    container.style.cursor = 'default'
    setcircleName(name)
  }

  // Logika untuk membuka panorama atau membuka lokasi landmark
  const dispatch = useDispatch()
  function handleClick(isRoute, name) {
    if (isRoute) {
      setCurrentScene(name)
      setOpenPanorama(true)
    } else {
      dispatch(toggleContent(''))
      dispatch(toggleContent('landmark'))
      dispatch(toggleLocation(name))
      window.scrollTo(0, 0)
      router.push(
        {
          pathname: '/',
          query: { content: 'landmark', location: name },
        },
        `/landmark?location=${name}`,
        { shallow: true },
      )
    }
  }

  return (
    <div
      className={clsx(
        'flex h-full w-full  bg-slate-200',
        navigation.theme === 'dark' ? ' bg-slate-700' : ' bg-slate-200',
      )}>
      <div className={clsx(' relative flex  w-full flex-col items-center justify-center')}>
        <div ref={mapContainer} className={clsx('flex h-[600px] w-full items-center justify-center overflow-hidden')}>
          <div className='absolute left-4 top-4 z-10 overflow-hidden rounded-md bg-black px-2 py-1 text-base text-white'>
            {' '}
            {circleName}
          </div>
          <div
            className={clsx(
              'absolute right-4 top-4  z-10 overflow-hidden rounded-md bg-black px-2 py-1 text-base text-white',
            )}>
            {mapName}
          </div>

          <MapInteractionCSS
            value={value}
            onChange={(value) => {
              setValue(value)
            }}>
            <div ref={mapRef} className={clsx('image-hotspot h-full w-full')}>
              <Stage width={mapImage.formats.large.width} height={mapImage.formats.large.height}>
                <Layer>
                  {image && <Image image={image} x={0} y={0} scaleX={1} scaleY={1} />}

                  {router.query.content == 'tour' &&
                    mapTour.map((data, index) => (
                      <Circle
                        key={index}
                        x={data.position[0]}
                        y={data.position[1]}
                        radius={9}
                        fill={'red'}
                        cursor='pointer'
                        onMouseEnter={(e) => {
                          handleMouseEnter(e, data.name)
                        }}
                        onMouseLeave={(e) => {
                          handleMouseLeave(e, data.name)
                        }}
                        onClick={(e) => {
                          handleClick(data.isRoute, data.name)
                          handleMouseEnter(e, data.name)
                        }}
                        onTap={(e) => {
                          handleClick(data.isRoute, data.name)
                          handleMouseEnter(e, data.name)
                        }}
                      />
                    ))}

                  {map.map((data, index) => (
                    <Circle
                      key={index}
                      x={data.x}
                      y={data.y}
                      radius={5}
                      fill={'blue'}
                      cursor='pointer'
                      onMouseEnter={(e) => {
                        handleMouseEnter(e, data.name)
                      }}
                      onMouseLeave={(e) => {
                        handleMouseLeave(e, data.name)
                      }}
                      onClick={(e) => {
                        handleClick(data.isRoute, data.name)
                        handleMouseEnter(e, data.name)
                      }}
                      onTap={(e) => {
                        handleClick(data.isRoute, data.name)
                        handleMouseEnter(e, data.name)
                      }}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </MapInteractionCSS>
        </div>
      </div>
    </div>
  )
}

export default Map
