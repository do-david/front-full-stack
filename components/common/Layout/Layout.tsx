import { FC } from 'react'
import { NavBar, Footer } from '@components/common'

const Layout:FC = ({children}) => {
    return(
        <>
            <NavBar/>
            {children}
            <Footer/>
        </>
    )
}

export default Layout