import { create } from "zustand"
import { io } from "socket.io-client"

interface InitialState {
  isOculus: boolean
  socket: any
  worldInfo: any
  setWorldInfo: (v: any) => void
  currentTour: number
  setCurrentTour: (v: any) => void
}

export const useStore = create<InitialState>()((set, get) => ({
  isOculus: /(OculusBrowser)/i.test(window.navigator.userAgent),
  //@ts-ignore
  // socket: io("https://api-gateway.vmiservers.com/socket"),
  socket: null,
  worldInfo: null,
  setWorldInfo: v => set({ worldInfo: v }),
  currentTour: 0,
  setCurrentTour: v => set({ currentTour: v }),
}))
