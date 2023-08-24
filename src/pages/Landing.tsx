import { useEffect, useRef } from "react";
import styled from "styled-components";

import WebXRScene from "@components/WebXRScene/WebXRScene";
import XRButton from "@components/XRButton/XRButton";
import GetWorldInfo from "@components/GetWorldInfo/GetWorldInfo";
import SphereManager from "@components/SphereManager/SphereManager";
import XRTabletController from "@components/XRTabletController/XRTabletController";

import { useStore } from "@state/store";
function Landing() {
  const setCurrentTour = useStore((s) => s.setCurrentTour);
  const socket = useStore((s) => s.socket);
  const isOculus = useStore((s) => s.isOculus);
  
  useEffect(() => {
    socket && socket.on("receive-test", (data) => {
      if (data.type === "texture") {
        setCurrentTour(data.count);
        return
      }
    });
  }, [socket]);
  return isOculus ? (
    <Wrapper>
      <WebXRScene>
        <GetWorldInfo />
        <SphereManager />
      </WebXRScene>
      {/* <XRButton /> */}
    </Wrapper>
  ) : (
    <XRTabletController />
  );
}

export default Landing;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
