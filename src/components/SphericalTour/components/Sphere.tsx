import React from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"

function Sphere({ texture, initialPos }) {
   const mainTexture = useLoader(THREE.TextureLoader, texture) as THREE.Texture
   mainTexture.minFilter = THREE.LinearFilter
   mainTexture.wrapS = THREE.RepeatWrapping
   mainTexture.repeat.x = -1

   return (
      <mesh
         // position={[0, 0, 0]}
         position={initialPos ? initialPos : [0, 0, 0]}
         rotation={[0, 0, 0]}>
         {/* rotation={initialPos ? initialPos : [0, 0, 0]}> */}
         <sphereGeometry args={[500, 60, 40]} />
         <meshBasicMaterial
            toneMapped={false}
            map={mainTexture}
            side={THREE.BackSide}
         />
      </mesh>
   )
}

export default Sphere
