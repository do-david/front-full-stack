import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@components/ui'
import { IProductsProps } from 'models/product'
import { RemoteData } from '@utils/remote-data'
import { GET_PRODUCT } from 'utils/apollo/queries/product'
import { useQuery } from '@apollo/client'

const GET_PRODUCT_BY_ID = `${process.env.REACT_APP_FAKESTORE_API_URL}/products/`

const ProductDetail:FC<IProductsProps> = () => {
    const router = useRouter()
    const fake = router.query.fake
    const id = router.query.id
    if(fake && fake == 'true' && typeof(id) === 'string'){
        const [ product, setProduct ] = useState<RemoteData<IProductsProps>>({
            status: 'init'
        })

        const getProduct = async(id:string) => {
            setProduct({ status: 'loading'})
            await fetch(`${GET_PRODUCT_BY_ID}${id}`,{headers: {"Content-type": "Application/json"}})
            .then(res=>res.json())
            .then(res=>{
                console.log('raw data',res)
                const item = res as IProductsProps
                setProduct({
                    status: 'loaded',
                    payload: item
                })
                console.info(product)
            })
            .catch(err=>{
                console.error(err)
                setProduct({
                    status: 'error',
                    error: err
                })
            })
        }
        useEffect(() => {
            getProduct(id)
        },[id])
        return(
            <>
            <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
                {/* <h1>Fake detail page</h1> */}
            </section>
            {product.status === 'error' &&(
                <Container>
                        {product.error?.message}
                </Container>
            )}
            {product.status === 'loading' &&(
                <Container>
                        Chargement ...
                </Container>
            )}
            {product.status === 'loaded' &&(
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Description from FakeStoreAPI
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and application.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                        title
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.payload.title}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                        Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.payload.description}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                        Category
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {product.payload.category}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                        Price
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        ${product.payload.price}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                        Image
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <img
                            id="product-image"
                            className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                            src={product.payload.image}
                            width="250"
                            height="250"
                            />
                        </dd>
                    </div>
                    </dl>
                </div>
                </div>
                )}
            </>
        )
    } else {
        const { loading, error, data } = useQuery(GET_PRODUCT, { variables: {id}})
        console.log(data)
        return(
            <>
                <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
                    {/* <h1>Dbb detail page</h1> */}
                </section>
                {loading &&(
                    <Container>
                        Chargement ...
                    </Container>
                )}
                {error && (
                    <Container>
                        {error.extraInfo}
                    </Container>
                )}
                {data &&(
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Description from API
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and application.
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            title
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.product.title}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.product.description}
                            </dd>
                        </div>
                        {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Category
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {data.category}
                            </dd>
                        </div> */}
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Price
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            ${data.product.price}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                            Image
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <img
                                id="product-image"
                                className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                                src={data.product.imgUrl}
                                width="250"
                                height="250"
                                />
                            </dd>
                        </div>
                        </dl>
                    </div>
                    </div>
                )}
            </>
        )
    }
}

export default ProductDetail