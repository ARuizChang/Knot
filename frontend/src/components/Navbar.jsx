import { useAuthStore } from '../store/useAuthStore.js'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { logout, user } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <nav className="bg-[var(--color-bg)] border-b border-[var(--color-border)] text-[var(--color-text)]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://freesvg.org/img/1537135697.png"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[var(--color-text)]">
              knot
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg text-[var(--color-text)] hover:bg-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] md:hidden"
            aria-controls="navbar-default"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${menuOpen ? '' : 'hidden'} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg 
                           bg-[var(--color-secondary)] border-[var(--color-border)]
                           md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/settings"
                  className="block py-2 px-3 rounded transition 
                             text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card)]
                             md:hover:bg-transparent md:p-0"
                >
                  Settings
                </Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block py-2 px-3 rounded transition 
                                 text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card)]
                                 md:hover:bg-transparent md:p-0"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="block py-2 px-3 rounded transition 
                                 text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card)]
                                 md:hover:bg-transparent md:p-0"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
