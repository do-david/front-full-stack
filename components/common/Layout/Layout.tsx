import { FC } from 'react'
import { NavBar, Footer } from '@components/common'
import styles from '../../../styles/Layout.module.css'
import { Container } from '@components/ui'

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