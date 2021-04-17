import { FC } from 'react'
import { NavBar, Footer } from '@components/common'
import styles from '../../../styles/Layout.module.css'

const Layout:FC = ({children}) => {
    return(
        <>
            <NavBar/>
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default Layout