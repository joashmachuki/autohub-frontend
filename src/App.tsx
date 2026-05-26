import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import SellCar from './pages/SellCar';
import About from './pages/About';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminVehicles from './pages/admin/Vehicles';
import AdminInquiries from './pages/admin/Inquiries';
import AdminPayments from './pages/admin/Payments';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/Jerry@-2020/login" element={<AdminLogin />} />
          <Route path="/Jerry@-2020/dashboard" element={<AdminDashboard />} />
          <Route path="/Jerry@-2020/vehicles" element={<AdminVehicles />} />
          <Route path="/Jerry@-2020/inquiries" element={<AdminInquiries />} />
          <Route path="/Jerry@-2020/payments" element={<AdminPayments />} />
          
          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/vehicles/:id" element={<VehicleDetail />} />
                  <Route path="/new-cars" element={<Vehicles type="new" />} />
                  <Route path="/used-cars" element={<Vehicles type="used" />} />
                  <Route path="/ebikes" element={<Vehicles type="ebike" />} />
                  <Route path="/motorcycles" element={<Vehicles type="motorcycle" />} />
                  <Route path="/sell-car" element={<SellCar />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shipping" element={<Shipping />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
