import Link from 'next/link';
import React, { FC } from 'react'

export interface IProductView {
    id: string;
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
    const verifyUrl = (url:string) => {
        let protocol = 'https://fakestoreapi.com/img'
        let res = false
        if(url.indexOf(protocol) !== -1){
            res = true
        }
        return res
    }
    return (
      <>
            <div
            key={id}
            className="flex-col p-6 md:w-1/2 xl:w-1/4"
            >
                {imageUrl && verifyUrl(imageUrl)? (
                    <Link  href={{ pathname: `/product/${id}`, query: {fake: true}}}>
                        <a className="flex justify-center">
                            <img
                            id="product-image"
                            className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                            alt={title}
                            src={imageUrl}
                            width="250"
                            height="250"
                            />
                        </a>
                    </Link>
                ) : (
                    <Link  href={{ pathname: `/product/${id}`, query: {fake: false}}}>
                        <a className="flex justify-center">
                            <img
                            id="product-image"
                            className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                            alt={title}
                            src={imageUrl}
                            width="250"
                            height="250"
                            />
                        </a>
                    </Link>
                )}
                <div className="flex justify-center pt-3">
                    <p className="font-bold text-center cursor-pointer">
                    {title.length > 18 ? getShortTitle(title) : title}
                    </p>
                </div>
                    <p className="pt-1 text-center text-gray-900"> ${price}</p>
            </div>
      </>
    );
  };
  
  export default ProductItems