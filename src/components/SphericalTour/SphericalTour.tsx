import CameraControls from "./components/CameraControls"
import Sphere from "./components/Sphere"


function SphericalTour({ texture, initialPos }) {

   return (
      // <Suspense fallback={<Loading />}>
      // <Suspense fallback={null}>
      //    <Scene>
      //       <CameraControls />
      <>
            <CameraControls />
            <Sphere initialPos={initialPos} texture={texture} />
            </>
      //    </Scene>
      // </Suspense>

   )
}

export default SphericalTour
