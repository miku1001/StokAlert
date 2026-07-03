import './App.css'
import { DesktopNav, MobileNav } from './components/navbar.jsx'
import HeroCard from './components/herocard.jsx'





function App() {

  return (
    <div className="min-h-screen">
      <DesktopNav />
      <MobileNav />
      <HeroCard/>
    </div>
  );
}

export default App
