import Link from 'next/link'
import { FC } from 'react'

const Avatar: FC = () => {
    return(
       <>
            <Link href="/login">
                <a
                className="inline-block pl-4 mt-4 no-underline"
                aria-label="Login"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" viewBox="0 0 30 30" width="55" height="55">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                </a>
            </Link>
        </>
    )
}
export default Avatar