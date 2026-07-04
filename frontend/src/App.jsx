import './App.css'
import { Routes, Route} from 'react-router-dom'
import DashboardLayout from './layouts/dashboardlayout';
import { HeroPage } from './pages/heropage'
import Overview from './pages/overview';
import Products from './pages/product';
import Sales from './pages/sales';
import Events from './pages/events';
import Settings from './pages/settings';



function App() {
  return (
    <div className="min-h-screen">

      <Routes>

        <Route path="/" element={<HeroPage />} />

        <Route path="/" element={<DashboardLayout />}>

          <Route path="dashboard" element={<Overview />} />

          <Route path="products" element={<Products />} />

          <Route path="sales" element={<Sales />} />

          <Route path="events" element={<Events />} />

          <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>

    </div>
  );
}

export default App
