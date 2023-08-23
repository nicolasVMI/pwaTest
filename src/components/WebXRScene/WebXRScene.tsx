import { Fragment, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { XR, Hands } from "@react-three/xr"
import { useStore } from "@state/store"

function WebXRScene({ children }) {
  const worldInfo = useStore((s) => s.worldInfo)
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
        "layers",
      ],
    }
    XRAPI.requestSession("immersive-vr", sessionInit).then((session) => {
      XRSession.current = session
      XRSession.current.onselect = () => XRSession.current.end()
      XRSession.current.onend = () => {
        XRSession.current = null
      }
      renderer.current.xr.setSession(XRSession.current)
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
        </XR>
      </Canvas>
    </Fragment>
  )
}

export default WebXRScene
