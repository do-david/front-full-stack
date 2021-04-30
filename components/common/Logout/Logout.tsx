import { FC, useContext } from 'react'
import { AppContext } from '../../../utils/context/AppContext'
import { useRouter } from 'next/router'

const Logout:FC = () => {
    const router = useRouter()
    const [, setAuth] = useContext(AppContext)
    const handleLogout = () => {
        setAuth(false)
        localStorage.removeItem('token')
        router.push('/')
    }
    return(
        <button onClick={handleLogout}>
            <a className="inline-block pl-4 mt-8 no-underline" aria-label="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55"  viewBox="0 0 30 30" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
            </a>
        </button>
    )
}
export default Logout