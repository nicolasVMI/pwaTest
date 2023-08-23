import { Fragment } from "react"
import { useSpring } from "@react-spring/core"
import { a } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

import { useStore } from "@state/store"
import CameraControls from "@components/SphericalTour/components/CameraControls"

function SphereManager() {
  const currentTour = useStore((s) => s.currentTour)
  const textures = [
    "/textures/bogota.jpg",
    "/textures/hoboken/hudson.jpg",
    "/textures/hoboken/plaza.jpg",
    "/textures/hoboken/terrace.jpg",
    "/textures/lesbordes/living.jpg",
    "/textures/lesbordes/bedroom.jpg",
    "/textures/lesbordes/master.jpg",
  ].map((path) => useLoader(THREE.TextureLoader, path) as THREE.Texture)

  textures.forEach((texture) => {
    texture.minFilter = THREE.LinearFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.x = -1
    //@ts-ignore
    texture.flipX = true
  })

  const getSprings = () => {
    let obj = {}
    for (let i = 0; i < textures.length; i++) {
      obj[i] = useSpring({ opacity: i === currentTour ? 1 : 0 })
    }
    return obj
  }
  const springs = getSprings()

  return (
    <Fragment>
      <CameraControls />
      {
        textures.map((texture, i) => {
          return (
            <mesh
              key={i}
              position={[0,0,0]}
              rotation={[0,0,0]}
            >
              <sphereGeometry args={[500, 60, 40]} />
              {/* @ts-ignore */}
              <a.meshBasicMaterial
                toneMapped={false}
                map={texture}
                side={THREE.DoubleSide}
                transparent
                opacity={springs[i].opacity}
              />
            </mesh>
          )
        })
      }
    </Fragment>
  )
}

export default SphereManager
