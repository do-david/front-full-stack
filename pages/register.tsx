import { Registration } from "@components/common"
import { FC } from 'react'

const Register:FC = () => {
    return(
        <>
         <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
            <h1>Registration page</h1>
        </section>
        <Registration></Registration>
        </>
    )
}

export default Register