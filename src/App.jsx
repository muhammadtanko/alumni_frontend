import { Routes, Route } from "react-router-dom";
import { SideBar } from "./components/sideBar"
import Dashboard from "./pages/dashboard"
function App() {

  return (
    <div className="">
      <main>

        {/* <SideBar  /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
