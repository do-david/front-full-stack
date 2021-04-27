import { Container, Grid } from '@components/ui'
import { useState, FC, useEffect } from 'react'
import { Carousel } from '@components/common'
import { RemoteData } from '../utils/remote-data'
import { IProductsProps } from 'models/product'
import { ProductsItems } from '@components/product'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import ProductItems from '@components/product/ProductsItem'
import client from '@utils/apollo/ApolloClient'
import { GET_ALL_PRODUCTS } from 'utils/apollo/queries/product'
import { useQuery } from '@apollo/client'

const GET_PRODUCTS = `${process.env.REACT_APP_FAKESTORE_API_URL}/products`

export interface IProduct {
  id:string;
  title:string;
  price:number;
  imgUrl:string;
}

const Home:FC = () => {
  // const [products, setProducts] = useState<RemoteData<IProductsProps[]>>({
  //   status: 'init'
  // })
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const productEx = {id:1 , image:'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', title:'tee-shirt'}
  // const getProducts = async () => {
  //   if(GET_PRODUCTS) {
  //     setProducts({ status: 'loading'})
  //     await fetch(GET_PRODUCTS,{headers: {"Content-type": "Application/json"}})
  //     .then(res=>res.json())
  //     .then(res=>{
  //       console.log('raw data',res)
  //         const items = res as IProductsProps[]
  //         console.info('response data : ',items)
  //         setProducts({
  //           status: 'loaded',
  //           payload: items
  //         })
  //         console.info(products)
  //     })
  //     .catch(err=>{
  //       console.error(err)
  //       setProducts({
  //         status: 'error',
  //         error: err
  //       })
  //     })
  //   }
  // }
  // useEffect(()=> {
  //   getProducts()
  // },[])
  if(loading){
    return(<Container>Loading ...</Container>)
  }
  if(error){
    return(<Container className="text-red-500">{error.message}</Container>)
  }
  return(
    <Container>
      <Carousel id={productEx.id} image={productEx.image} title={productEx.title}/>
        <div className="flex-1">
          {data &&(
             <section className="container mx-auto bg-white">
              <div id="product-container" className="flex flex-wrap items-center">
              {/* {data.products.map(({id,title,price,imgUrl}:IProduct)=> {
                  return(
                   <ProductItems id={id} imageUrl={imgUrl} price={price} title={title}/>
                  )
                })}   */}
              </div>
              </section>
          )}
          {/* {products.status === 'error' &&(
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
          )} */}
      </div>
    </Container>
  )
}

export default Home