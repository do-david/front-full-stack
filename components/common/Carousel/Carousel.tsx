import React, { useState, useEffect,FC } from 'react'

interface IProps {
    id: number;
    image: string;
}
const Carousel:FC<IProps> = ({...props}) => {
    const id = props.id
    const imgUrl = props.image
    console.log('id & image from carousel',{id, imgUrl})
    return(
        <>
            <section
            id="carousel"
            className="flex w-full pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
                <div className="container mx-auto" >
                    <div className="flex flex-col items-start justify-center w-full px-6 tracking-wide lg:w-1/2">
                        <h1 className="p-4 my-4 text-2xl text-white bg-black rounded-lg">
                        Découvertes
                        </h1>
                        <a
                        className="inline-block px-6 py-3 text-xl leading-relaxed text-white uppercase bg-black rounded-lg hover:underline"
                        href="#">
                        Product_title
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Carousel