import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard"
import Onboarding from "./pages/onboarding"
import Calendar from "./pages/calendar"
import Login from "./pages/login"
import Class from "./pages/class"
import Payment from "./pages/payments"
import Email from "./pages/email"
import Election from "./pages/election"
import Chapter from "./pages/chapter"
import Meeting from "./pages/meeting"
import Gallery from "./pages/gallery"

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
          <Route path="/class" element={<Class />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/email" element={<Email />} />
          <Route path="/election" element={<Election />} />
          <Route path="/chapters" element={<Chapter />} />
          <Route path="/meetings" element={<Meeting />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
