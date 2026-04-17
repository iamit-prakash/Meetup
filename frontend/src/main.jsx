
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"



import Meetups from './App.jsx'
import Details from "./components/Details.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Meetups />
  },
   {
    path: "/:id",
    element: <Details />
   }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
