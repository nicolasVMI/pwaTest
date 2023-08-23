import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { useVideoTexture } from "@react-three/drei"

function Sphere({ texture, initialPos, isVideo = false }) {
  const mainTexture = useLoader(THREE.TextureLoader, texture) as THREE.Texture
  mainTexture.minFilter = THREE.LinearFilter
  mainTexture.wrapS = THREE.RepeatWrapping
  mainTexture.repeat.x = -1

  return (
    <mesh position={initialPos ? initialPos : [0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        toneMapped={false}
        map={mainTexture}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default Sphere
