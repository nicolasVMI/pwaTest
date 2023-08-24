import { Routes, Route } from "react-router-dom"

import routes from "./routes/routes"
import { useStore } from "@state/store"

function Content() {
//    const setIsOnline = useStore(s => s.setIsOnline)
//   async function handleConnection() {
//     // if(navigator.onLine){
//     try {
//       const request = await fetch("https://api-gateway.vmiservers.com/", {
//          cache: "no-store"
//       })
//       const response = await request.json()
//       console.log(response)
//       if(response){
//          setIsOnline(true)
//       }
//     } catch (error) {
//       console.log("error ~~~", error.message)
//     }
//     return
//     // }else{
//     // //   setIsOnline(false)
//     // }
//   }
  return (
    <>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route key={idx} path={route.path} element={<route.element />} />
            )
          )
        })}
      </Routes>
      {/* <div
        onClick={handleConnection}
        style={{
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "red",
          width: "100px",
          height: "50px",
          top: "10px",
          left: "10px",
          display: "grid",
          placeContent: "center",
        }}
      >
        FETCH
      </div> */}
    </>
  )
}

export default Content
