import { Container } from '@components/ui'
import { FC } from 'react'
import { Carousel } from '@components/common'
import ProductItems from '@components/product/ProductsItem'
import { GET_ALL_PRODUCTS } from 'utils/apollo/queries/product'
import { useQuery } from '@apollo/client'


export interface IProduct {
  id:string;
  title:string;
  price:number;
  imgUrl:string;
}

const Home:FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if(loading){
    return(<Container>Loading ...</Container>)
  }
  if(error){
    return(<Container className="text-red-500">{error.message}</Container>)
  }
  return(
    <Container>
      <Carousel/>
          {data &&(
            <>
              <div id="product-container" className="flex flex-wrap items-center">
              {data.products.map(({id,title,price,imgUrl}:IProduct)=> {
                  return(
                   <ProductItems id={id} imageUrl={imgUrl} price={price} title={title}/>
                  )
                })}  
              </div>
              </>
          )}
    </Container>
  )
}

export default Home