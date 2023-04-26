import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Model from './Model'
import Controls from './Control'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import Background from '../Background'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { mode } from 'tailwind.config'

export default function Scene({ children, ...props }) {
  const config = {
    camStartPosition: new THREE.Vector3(0, 15, 25),
    camSBAwalFov: 30,
  }

  const [zoom, setZoom] = useState(false)
  const [location, setLocation] = useState('')

  const toggleZoom = (e) => {
    if (zoom === true) {
      setZoom(false)
      setLocation('')
    } else if (zoom === false) {
      setZoom(true)
      setLocation(e)
    }
  }

  useEffect(() => {
    // console.log(location)
  }, [location])

  return (
    <div className={clsx('absolute h-full w-full')}>
      <Canvas
        // dpr={1.5}
        frameloop='demand'
        camera={{ fov: config.camSBAwalFov, near: 0.1, far: 500, position: config.camStartPosition }}
        {...props}>
        {/*  */}
        {/*  */}
        <directionalLight intensity={0.75} />
        <ambientLight intensity={0.75} />
        <Preload all />
        {/* <Perf /> */}
        {/*  */}
        {/* */}
        <Controls mode={props.mode} freeControl={props.freeControl} />
        <Model toggleZoom={toggleZoom}></Model>
        <Background />
        {/*  */}
        {/*  */}
        {children}
        {/*  */}
        {/*  */}
      </Canvas>
    </div>
  )
}
