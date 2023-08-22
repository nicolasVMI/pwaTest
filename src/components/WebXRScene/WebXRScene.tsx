import { Fragment, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { XR, Hands, Controllers, Interactive } from "@react-three/xr"
import SphericalTour from "@components/SphericalTour/SphericalTour"
import { useStore } from "@state/store"

function WebXRScene({ children }) {
   const worldInfo = useStore(s => s.worldInfo)
   const XRSession = useRef<XRSession | null>(null)
   const renderer = useRef<any>(null)
   //@ts-ignore
   const XRAPI = navigator.xr

   function handleSessionRequest() {
         const sessionInit = {
            optionalFeatures: [
               "local-floor",
               "bounded-floor",
               "hand-tracking",
               "layers"
            ]
         }
         XRAPI.requestSession("immersive-vr", sessionInit).then(session => {
            XRSession.current = session
            // XRSession.current.onselectstart = logEvent
               XRSession.current.onselect = () => XRSession.current.end()
            // XRSession.current.onselectend = logEvent
            XRSession.current.onend = () => {
               XRSession.current = null
            }
            renderer.current.xr.setSession(XRSession.current)
            //  console.log(renderer.xr)
            //  console.log(XRSession.current)
         })
      
   }

   useEffect(() => {
      if (worldInfo) {
         renderer.current = worldInfo.gl
      }
   }, [worldInfo])
   return (
      <Fragment>
         <Canvas color="teal" onClick={handleSessionRequest}>
            <XR>
               {children}
               <Hands />
               {/* <GetInfo />
             <SphericalTour
                texture={"/textures/plaza.jpg"}
                initialPos={test ? [0, 0, 0] : [1000, 0, 0]}
             />
             <SphericalTour
                texture={"/textures/terrace.jpg"}
                initialPos={test ? [-1000, 0, 0] : [0, 0, 0]}
             />
             <SphericalTour
                texture={"/textures/hudson.jpg"}
                initialPos={test ? [-1000, 0, 0] : [0, 0, 0]}
             /> */}
            </XR>
         </Canvas>
      </Fragment>
   )
}

export default WebXRScene
