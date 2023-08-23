import { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";

import { useStore } from "@state/store";
import Transition360 from "@components/Transition360/Transition360";
import SphericalTour from "@components/SphericalTour/SphericalTour";

function XRTabletController() {
  const worldInfo = useStore(s => s.worldInfo)
  const currentTour = useStore((s) => s.currentTour);
  const setCurrentTour = useStore((s) => s.setCurrentTour);
  const socket = useStore((s) => s.socket);
  const renderer = useRef<any>(null)
  const XRSession = useRef<XRSession | null>(null)

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
     XRAPI.requestSession("immersive-ar", sessionInit).then(session => {
        XRSession.current = session
        // XRSession.current.onselectstart = logEvent
        XRSession.current.onselect = () => XRSession.current.end()
        XRSession.current.onend = () => {       }
        renderer.current.xr.setSession(XRSession.current)
     })
  }

  const array = [
    "/textures/bogota.jpg",
    "/textures/hoboken/hudson.jpg",
    "/textures/hoboken/plaza.jpg",
    "/textures/hoboken/terrace.jpg",
    "/textures/lesbordes/living.jpg",
    "/textures/lesbordes/bedroom.jpg",
    "/textures/lesbordes/master.jpg",
  ];

  useEffect(() => {
    if(worldInfo){
      renderer.current = worldInfo.gl
    }
  }, [worldInfo])

  return (
    <TabletWrapper>
      <Suspense fallback={null}>
        <Transition360 />
      </Suspense>
      <Div>
        {array.map((n, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setCurrentTour(i);
                socket.emit("test", {
                  type: "texture",
                  count: i,
                });
              }}
              onDoubleClick={() => { 
                setTimeout(() => {
                  handleSessionRequest()
                }, 1000)
              }}
              >
              <img alt="" src={n} />
            </div>
          );
        })}
      </Div>
    </TabletWrapper>
  );
}

export default XRTabletController;

const TabletWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  pointer-events: none;
  
  & div {
    border: 1px solid white;
    height: 30%;
    width: 33%;
    place-content: center;
    font-size: 30px;
    overflow: hidden;
    cursor: pointer;
    pointer-events: all;

    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
