import { Container } from '@components/ui'
import { FC } from 'react'
import jwt from 'jsonwebtoken'
import { GET_USER } from 'utils/apollo/queries/user'
import { useQuery } from '@apollo/client'
import { IUser } from 'models/user'

const Account: FC<IUser>= () => {
    if(typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if(token){
        const jwtDecoded:any = jwt.verify(token,'supersecret');
        const id = jwtDecoded.id;
        const { loading, error, data } = useQuery(GET_USER, { variables: {id}})
        return(
            <>
            <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
                <h1>Account page</h1>
            </section>
            {loading &&(
                <Container>Chargement ...</Container>
            )}
            {error && (
                <Container>{error.extraInfo}</Container>
            )}
            {data &&(
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Get user via graphql
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Account detail
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Firstname
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.getCurrentUser.firstName}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Lastname
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.getCurrentUser.lastName}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.getCurrentUser.email}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Age
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.getCurrentUser.age}
                            </dd>
                        </div>
                        </dl>
                    </div>
                    </div>
            )}
            </>
        )
    } else {
        return(
            <Container> Erreur lors de la récupération du token</Container>
        )
    }
    } else {
        return(
            <Container> Erreur interne</Container>
        )
    }
}

export default Account