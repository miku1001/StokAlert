import { Link } from 'react-router-dom'
function NavBar() {
  
  return (
  <nav className="hidden sm:flex justify-between items-center px-20 py-5">     
   <span className='text-white'>StokAlerto</span>
      <ul className='flex gap-10 text-white'>
        <li><Link className = "nav-link hover:font-semibold" to="/">Home</Link></li>
        <li><Link className = "nav-link hover:font-semibold" to="/product">Product</Link></li>
        <li><Link className = "nav-link hover:font-semibold" to="/how">How it works</Link></li>
        <li><Link className = "nav-link hover:font-semibold" to="/pricing">Pricing</Link></li>
      </ul>
      <Link className="text-white border border-emerald-950 bg-zinc-900  py-2 px-5 rounded-3xl" to="/signup">Try it free</Link>
    </nav>
  );
}
export default NavBar;