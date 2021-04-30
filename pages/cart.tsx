import Link from 'next/link'
import { FC } from 'react'

const Cart:FC = () => {
    return(
        <>
        <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
        <h1>Cart page</h1>
        </section>
        <div className="p-6 mx-auto mt-5">
              <h2 className="text-lg">Aucun produit dans le panier</h2>
              <button className="px-4 py-2 m-4 font-bold uppercase bg-white border border-gray-400 border-solid rounded hover:bg-gray-400">
                <Link href="/products">
                  <a>Voir catalogue de produits</a>
                </Link>
              </button>
            </div>
        </>
    )
}
export default Cart