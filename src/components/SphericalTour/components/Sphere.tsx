import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { useVideoTexture } from "@react-three/drei"

function Sphere({ texture, initialPos, isVideo = false }) {
  let videoTexture
  let mainTexture
  if (isVideo) {
    const video = document.createElement("video")
    video.src = texture
    video.loop = true
    video.crossOrigin = "anonymous"
    video.playsInline = true
    video.muted = true
    video.play()
    videoTexture = new THREE.VideoTexture( video );
  } else {
    mainTexture = useLoader(THREE.TextureLoader, texture) as THREE.Texture
    mainTexture.minFilter = THREE.LinearFilter
    mainTexture.wrapS = THREE.RepeatWrapping
    mainTexture.repeat.x = -1
  }
  return isVideo ? (
    <mesh
      // position={[0, 0, 0]}
      position={initialPos ? initialPos : [0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      {/* rotation={initialPos ? initialPos : [0, 0, 0]}> */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        toneMapped={false}
        map={videoTexture}
        side={THREE.BackSide}
      />
    </mesh>
  ) : (
    <mesh
      // position={[0, 0, 0]}
      position={initialPos ? initialPos : [0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      {/* rotation={initialPos ? initialPos : [0, 0, 0]}> */}
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
