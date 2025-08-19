import { Navbar } from "./components/Navbar"
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Rooms from "./pages/Rooms"
import RoomDetails from "./pages/RoomDetails"
import MyBookings from "./pages/MyBookings"
import { HotelRegistration } from "./components/HotelRegistration"
import Layout from "./pages/Hosts/Layout"
import Dashboard from "./pages/Hosts/Dashboard"
import AddRoom from "./pages/Hosts/AddRoom"
import ListRoom from "./pages/Hosts/ListRoom"

function App() {

  const isOwnerPath = useLocation().pathname.includes("owner")

  return (
    <div className="">
      {!isOwnerPath && <Navbar />}
      {false && <HotelRegistration />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="listed-rooms" element={<ListRoom />} />
            <Route path="add-room" element={<AddRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />

    </div>
  )
}

export default App
