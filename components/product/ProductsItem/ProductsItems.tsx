import Link from 'next/link';
import React, { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface IProductView {
    id: number;
    imageUrl: string;
    price: number;
    title: string;
}
const ProductItems:FC<IProductView> = ({...props}) => {
    const id = props.id
    const imageUrl = props.imageUrl
    const price = props.price
    const title = props.title
    const getShortTitle = (title:string) => {
        let result = ``
        let count = 0
        while(count < 18) {
            result = `${result}${title[count]}`
            count ++
        }
        result = `${result}...`
        return result
    }
    return (
      <>
            <div
            key={uuidv4()}
            className="flex flex-col p-6 md:w-1/2 xl:w-1/4"
            >
            <Link
                href={`/product/${encodeURIComponent(id)}`}
            >
                <a>
                {imageUrl ? (
                    <img
                    id="product-image"
                    className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                    alt={title}
                    src={imageUrl}
                    />
                ) : (
                    <img
                    id="product-image"
                    className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                    alt={title}
                    src="https://fakeimg.pl/300/"
                    />
                )}
                </a>
            </Link>

            <Link
                href={`/product/id=${encodeURIComponent(id)}`}
            >
                <a>
                <div className="flex justify-center pt-3">
                    <p className="font-bold text-center cursor-pointer">
                    {getShortTitle(title)}
                    </p>
                </div>
                </a>
            </Link>
            <p className="pt-1 text-center text-gray-900"> ${price}</p>
            </div>
      </>
    );
  };
  
  export default ProductItems