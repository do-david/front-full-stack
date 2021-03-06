import Link from 'next/link'
import { useContext, FC, useEffect } from 'react'
import { Hamburger,Cart, Avatar, Logout } from '@components/common'
import { Container } from '@components/ui'
import { AppContext } from 'utils/context/AppContext'

const NavBar:FC = () => {
  const [isAuth] = useContext(AppContext)
    return (
        <Container>
          <nav id="header" className="fixed top-0 z-50 w-full py-1 bg-white ">
            <div className="container flex flex-wrap items-center justify-between px-6 py-3 mx-auto mt-0">
              <Hamburger />
              <div
                className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1"
                id="menu"
              >
                <ul className="items-center justify-between pt-4 text-base text-gray-700 md:flex md:pt-0">
                  <li>
                    <Link href="/products">
                      <a className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                        Produits
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                        Categories
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <Link href="/">
                  <a className="flex items-center text-xl font-bold tracking-wide text-gray-800 no-underline hover:no-underline ">
                    <svg
                      className="mr-2 text-gray-800 fill-current"
                      xmlns="https://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      aria-label="E-shop logo"
                    >
                      <path
                        d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"
                        aria-label="E-shop logo"
                      />
                    </svg>
                    E-shop
                  </a>
                </Link>
              </div>
              <div
                className="flex items-center order-2 md:order-3"
                id="nav-content"
              >
                {/* <Search /> */}
                {isAuth &&(
                  <>
                    <Cart />
                    <Logout/>
                  </>
                )}
                {!isAuth &&(
                  <Avatar/>
                )}
              </div>
            </div>
          </nav>
        </Container>
    )
}

export default NavBar