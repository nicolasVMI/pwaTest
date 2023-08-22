import ErrorMessage from "@pages/ErrorMessage"
import Landing from "@pages/Landing"

const routes = [
  {
    name: "Landing",
    path: "/",
    exact: true,
    element: Landing,
  },
  { path: "/*", name: "Not Found", element: ErrorMessage },
]

export default routes
