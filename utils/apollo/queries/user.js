import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
    query Users {
        users {
            id,
            firstName,
            lastName,
            email,
            age,
            isAdmin
        }
    }
`
export const GET_PRODUCT = gql`
    query User($id: ID) {
        user(userId:$id) {
            id,
            firstName,
            lastName,
            email,
            age,
            isAdmin
        }
    }
`