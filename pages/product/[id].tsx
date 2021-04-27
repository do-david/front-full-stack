import { FC } from 'react'
import { useRouter } from 'next/router'
import { Container } from '@components/ui'

const ProductDetail:FC = () => {
    //problème de disposition partie mangé par la navbar
    console.log('id page')
    return (
        <>
        <Container className="mt-8 md:my-8">
                <h1>Page Detail</h1>
                <img
                id="product-image"
                className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                alt="test"
                src="https://fakeimg.pl/300/"
                width="250"
                height="250"
                />
                <h2>test2</h2>
        </Container>
        </>
    )
}

export default ProductDetail