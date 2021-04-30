import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
    query Products {
        products {
            id,
            title,
            price,
            description,
            imgUrl
        }
    }
`
export const GET_PRODUCT = gql`
    query Product($id: ID!) {
        product(id:$id){
            id,
            title,
            price,
            description,
            imgUrl
        }
    }
`