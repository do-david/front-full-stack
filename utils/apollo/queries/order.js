import { gql } from '@apollo/client'

export const GET_ALL_ORDERS = gql`
    query Orders {
        getOrders {
            id,
            totalAmount,
            user,
            products,
            status
        }
    }
`