import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard"
import Onboarding from "./pages/onboarding"
import Home from "./pages/home"
import Login from "./pages/login"
import Set from "./pages/set"
import Payment from "./pages/payments"
import Email from "./pages/email"
import Election from "./pages/election"
import Chapter from "./pages/chapter"
import Events from "./pages/events"
import Gallery from "./pages/gallery"
import Register from "./pages/register/index"
import Trial from "./pages/others/trial"

function App() {

  return (
    <div className="">
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/set" element={<Set />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/email" element={<Email />} />
          <Route path="/election" element={<Election />} />
          <Route path="/chapters" element={<Chapter />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/trial" element={<Trial />} />
        </Routes>
      </main>
    </div>
  )
}
//test

export default App
