import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import DefaultLayout from "./DefaultLayout"

import { useStore } from "@state/store"

function App() {
  // const setIsOnline = useStore(s => s.setIsOnline)

  // async function handleConnection(){
  //   if(navigator.onLine){
  //     const request = await fetch("https://api-gateway.vmiservers.com/")
  //     const response = await request.json()
  //     console.log(response)
  //     return
  //   }else{
  //     setIsOnline(false)
  //   }

  // }
  // useEffect(() => {
  //   // handleConnection()
  //   window.addEventListener("online", handleConnection)
  //   window.addEventListener("offline", handleConnection)
  // }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App