import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard"
import Onboarding from "./pages/onboarding"
import Calendar from "./pages/calendar"
import Login from "./pages/login"
import Register from "./pages/register/index"
function App() {

  return (
    <div className="">
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
