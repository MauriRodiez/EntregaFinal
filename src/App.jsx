import { routes } from "./utils/routes"
import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import ItemListContainer from "./components/ItemListContainer"


function App() {

  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Layout/>}>
          <Route path={routes.home} element={<ItemListContainer />} />
        </Route>
      </Routes>
    </>
  )
  
}

export default App
