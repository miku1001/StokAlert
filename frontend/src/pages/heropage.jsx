import { DesktopNav, MobileNav } from '../components/navbar.jsx'
import HeroCard from '../components/herocard.jsx'

export function HeroPage() {
  return (
    <div>
      <DesktopNav />
      <MobileNav />
      <HeroCard/>
    </div>


  );
}