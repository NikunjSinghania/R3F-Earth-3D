import React ,{ useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { SphereGeometry, TextureLoader } from 'three'
import * as THREE from 'three'

import DayMap from '../../assets/8k_earth_daymap.jpg'
import Nightmap from '../../assets/8k_earth_nightmap.jpg'
import NormalMap from '../../assets/8k_earth_normal_map.jpg'
import SpecularMap from '../../assets/8k_earth_specular_map_1.jpg'
import CloudsMap from '../../assets/8k_earth_clouds.jpg'

export function Earth(props) {

  const [colorMap, normalMap, specularMap, CloudMap] = useLoader(TextureLoader, [DayMap, NormalMap, SpecularMap, CloudsMap])


  const earthRef = useRef();
  const cloudRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime/6
    cloudRef.current.rotation.y = elapsedTime/6

  })

  return (
    <>
        {/*<ambientLight intensity={0.5}/>*/}
        <pointLight color='#f6f3ea' position={[2, 0, 5]} intensity={1.2}/>
        <Stars
            radius={300}
            depth={60}
            count={2000}
            factor={7}
            saturation={0}
            fade={true}
        />
        <mesh ref={cloudRef} position={[0, 0, 3]}>
            <sphereGeometry args={[1.005, 32, 32]} />
            <meshPhongMaterial 
                map={CloudMap} 
                opacity={0.4}
                depthWrite={true} 
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
        <mesh ref={earthRef} position={[0, 0, 3]}>
            <sphereGeometry args={[ 1, 32, 32 ]}/>
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial
             map={colorMap} 
             normalMap={normalMap} 
             metalness={0.4}
             roughness={0.7}
            />
            {/*<OrbitControls
                enableZoom={true} 
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.6}
                panSpeed={0.5}
                rotateSpeed={0.4}
                //target={}
            />*/}
        </mesh>
    </>
  )
}

//export default index