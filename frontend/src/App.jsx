import './App.css'
import { Routes, Route} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { HeroPage } from './pages/heropage'



function App() {

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HeroPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App
