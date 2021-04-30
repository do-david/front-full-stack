import { FC } from 'react'
import { NavBar, Footer } from '@components/common'
import styles from '../../../styles/Layout.module.css'
import { Container } from '@components/ui'

const Layout:FC = ({children}) => {
    return(
        <>
            <NavBar/>
            <Container>
                <div className="flex-1">
                    <section className="container mx-auto bg-white">
                        {children}
                    </section>
                </div>
            </Container>
            <Footer/>
        </>
    )
}

export default Layout