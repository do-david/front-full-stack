import { RemoteData } from '@utils/remote-data'
import { FC, useEffect, useState } from 'react'

const GET_CATEGORIES = `${process.env.REACT_APP_FAKESTORE_API_URL}/products/categories`

export interface ICategory{
    name:string;
}

const Categories: FC = () => {
    const [categories, setCategories] = useState<RemoteData<ICategory[]>>({
    status: 'init'
  })
  const getProducts = async () => {
    if(GET_CATEGORIES) {
        setCategories({ status: 'loading'})
      await fetch(GET_CATEGORIES,{headers: {"Content-type": "Application/json"}})
      .then(res=>res.json())
      .then(res=>{
        console.log('raw data',res)
          const items = res as ICategory[]
          console.info('response data : ',items)
          setCategories({
            status: 'loaded',
            payload: items
          })
          console.info(categories)
      })
      .catch(err=>{
        console.error(err)
        setCategories({
          status: 'error',
          error: err
        })
      })
    }
  }
  useEffect(()=> {
    getProducts()
  },[])
  return(
    <>
        <section className="flex w-full h-auto pt-10 mx-auto bg-right bg-cover mt-36 md:pt-0 md:items-center">
            {/* <h1> page</h1> */}
        </section>
        {categories.status === 'loading' &&(
            <p className="text-red-500">Chargement ...</p>
        )}
        {categories.status === 'error' &&(
            <p className="text-red-500">{categories.message}</p>
        )}
        {categories.status === 'loaded' &&(
            <div id="category-container" className="flex flex-wrap items-center">
                {categories.payload.map((c,index) => {
                    return(
                        <div className="flex-col p-6 md:w-1/2 xl:w-1/4">
                                <div className="flex justify-center" key={index}>
                                    <dl className="border rounded-lg">
                                        <div className="relative">
                                        <dt>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </dt>
                                        <dt>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{c}</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                                        </dd>
                                        </div>
                                    </dl>
                                </div>
                        </div>
                    )
                })}
            </div>
        )}
    </>
  )

}
export default Categories