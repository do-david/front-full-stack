import { Container } from '@components/ui'
import { FC } from 'react'

const Account: FC = () => {
    console.log('account page')
    return(
        <>
        <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
            <h1>Account page</h1>
        </section>
        <h1>here is account</h1>
        </>
    )
}

export default Account