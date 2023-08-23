import CameraControls from "./components/CameraControls"
import Sphere from "./components/Sphere"
import Scene from "./components/Scene"

function SphericalTour({ texture, initialPos, isVideo = false }) {
  return (
    // <Suspense fallback={<Loading />}>
   //  <Suspense fallback={null}>
      <Scene>
        <CameraControls />
        <Sphere initialPos={initialPos} texture={texture} isVideo={isVideo}/>
      </Scene>
   //  </Suspense>
  )
}

export default SphericalTour
