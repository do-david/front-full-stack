import { Container } from '@components/ui'
import { useState, FC, useEffect } from 'react'
import { Carousel } from '@components/common'

const GET_PRODUCTS = process.env.REACT_APP_FAKESTORE_API_URL
const Home:FC = () => {
  const [products, setProducts] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const productEx = {id:1 , image:'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'}
  const getProducts = async () => {
    try {
        if(GET_PRODUCTS){
          await fetch(`${GET_PRODUCTS}/products`,{headers: {"Content-type": "Application/json"}})
          .then(res=>res.json())
          .then(data=>{
            setProducts(data)
          })
          .catch(err=>console.error(err))
        }
        else{
          console.log('cannot get variable in env')
        }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=> {
    getProducts()
  },[])
  return(
    <Container>
      <Carousel id={productEx.id} image={productEx.image}/>
    </Container>
  )
}

export default Home