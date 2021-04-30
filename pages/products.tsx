import ProductItems from '@components/product/ProductsItem'
import { RemoteData } from '@utils/remote-data'
import { IProductsProps } from 'models/product'
import { FC, useEffect, useState } from 'react'

const GET_PRODUCTS = `${process.env.REACT_APP_FAKESTORE_API_URL}/products`


const Products: FC = () => {
    const [products, setProducts] = useState<RemoteData<IProductsProps[]>>({
    status: 'init'
  })
  const getProducts = async () => {
    if(GET_PRODUCTS) {
      setProducts({ status: 'loading'})
      await fetch(GET_PRODUCTS,{headers: {"Content-type": "Application/json"}})
      .then(res=>res.json())
      .then(res=>{
        console.log('raw data',res)
          const items = res as IProductsProps[]
          console.info('response data : ',items)
          setProducts({
            status: 'loaded',
            payload: items
          })
          console.info(products)
      })
      .catch(err=>{
        console.error(err)
        setProducts({
          status: 'error',
          error: err
        })
      })
    }
  }
  useEffect(()=> {
    getProducts()
  },[])
  return(
    <>
        <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
            {/* <h1> page</h1> */}
        </section>
        {products.status === 'loading' &&(
            <p className="text-red-500">Chargement ...</p>
        )}
        {products.status === 'error' &&(
            <p className="text-red-500">{products.message}</p>
        )}
        {products.status === 'loaded' &&(
        <section className="container mx-auto bg-white">
            <div id="product-container" className="flex flex-wrap items-center">
            {products.payload.map((p)=> {
                return(
                <ProductItems id={p.id} imageUrl={p.image} price={p.price} title={p.title}/>
                )
            })}
            </div>
        </section>
        )}
    </>
  )

}
export default Products