import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinkClass = 'nav-link hover:font-semibold'

export function DesktopNav() {
  return (
    <header className="hidden sm:block sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-20 py-4">
        <span className="text-white text-base font-medium">StokAlerto</span>

        <ul className="flex gap-10 text-white text-sm">
          <li><Link className={navLinkClass} to="/">Home</Link></li>
          <li><Link className={navLinkClass} to="/product">Product</Link></li>
          <li><Link className={navLinkClass} to="/how">How it works</Link></li>
          <li><Link className={navLinkClass} to="/pricing">Pricing</Link></li>
        </ul>

        <Link
          className="text-white text-base border border-zinc-700 bg-zinc-900 py-2 px-5 rounded-3xl transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 hover:-translate-y-0.5 hover:shadow-lg"
          to="/signup"
        >
          Try it free
        </Link>
      </nav>
    </header>
  )
}

export function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 sm:hidden bg-[#0a0a0a]/95 backdrop-blur-sm">
      <nav className="grid grid-cols-3 items-center px-4 py-4">
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center justify-self-start rounded-full border border-zinc-700 bg-zinc-900 p-2 text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 hover:-translate-y-0.5 hover:shadow-lg"
        >
          {isMobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>

        <span className="justify-self-center text-white text-sm font-medium">StokAlerto</span>

        <div className="justify-self-end">
          <Link
            className="text-white text-sm border border-zinc-700 bg-zinc-900 py-2 px-4 rounded-3xl transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500 hover:-translate-y-0.5 hover:shadow-lg"
            to="/signup"
          >
            Try it free
          </Link>
        </div>
      </nav>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-zinc-700 bg-[#101010] p-5 shadow-2xl transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
          <span className="text-white text-sm font-medium">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 p-2 text-white transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-500"
          >
            <FiX size={18} />
          </button>
        </div>

        <ul className="flex flex-col gap-5 text-white text-md">
          <li><Link className={navLinkClass} to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link className={navLinkClass} to="/product" onClick={() => setIsMobileMenuOpen(false)}>Product</Link></li>
          <li><Link className={navLinkClass} to="/how" onClick={() => setIsMobileMenuOpen(false)}>How it works</Link></li>
          <li><Link className={navLinkClass} to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link></li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close mobile menu overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-black/40"
        />
      )}
    </header>
  )
}
