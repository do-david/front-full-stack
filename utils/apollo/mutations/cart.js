import { gql } from '@apollo/client'

export const ADD_TO_CART = gql`
    mutation ($user:ID!, $products:[ID!],$totalAmount:Float) {
        makeOrder(user:$user,products:$products,totalAmount:$totalAmount){
            user
            products {
                id,
                title
            }
            totalAmount
        }
    }
`