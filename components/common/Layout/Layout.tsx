import { FC } from 'react'
import { NavBar, Footer } from '@components/common'
import styles from '../../../styles/Layout.module.css'
import { Container } from '@components/ui'

const Layout:FC = ({children}) => {
    return(
        <>
            <NavBar/>
                <Container>
                    {children}
                </Container>
            <Footer/>
        </>
    )
}

export default Layout