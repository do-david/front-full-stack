import { Container, Modal } from '@components/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, FC } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../utils/apollo/mutations/login'

const Avatar: FC = () => {
    const router = useRouter()
    const [ isOpen, setIsOpen ] = useState(false)
    const [formState,setFormState] = useState({email:'',password:''})
    // const [login, { loading, error }] = useMutation(LOGIN)
    const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = (e:any) => {
        e.preventDefault()
        // login()
        const myBody = JSON.stringify(formState);
        const callOption = {"Content-type": "Application/json"}
        fetch("https://full-stack1.herokuapp.com/api/v1/login",{method: "POST",headers:callOption ,body: myBody})
        .then(res=>res.json())
        .then(data => {
            if(!data.auth){
                setErrorMessage(data.message);
                return
            }
            else {
                let token = data.token;
                localStorage.setItem('token',token);
                setIsOpen(false);
                router.push("/account");
            }
        })
        .catch(err=>{
            console.error(err);
            setErrorMessage(err.message);
        });
    }
    // if(loading){
    //     return(<Container>Loading ...</Container>)
    // }
    return(
       <>
            <Modal className="bg-white" open={isOpen} onClose={()=>setIsOpen(false)}>
            <div className="max-w-md w-full space-y-8 bg-gray-50">
            <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(e)=>handleSubmit(e)} method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email"  onChange={e=>setFormState({...formState, email: e.target.value})} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
            </div>
            <div>
                <label  className="sr-only">Password</label>
                <input id="password" name="password" type="password" onChange={e=>setFormState({...formState, password: e.target.value})} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
            </div>
            <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                        <label className="ml-2 block text-sm text-gray-900">
                        Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                        </a>
                    </div>
                </div>
            {/* {error && (
                <span className="text-red-500">
                    An error occured: {error.message}
                </span>
            )} */}
            {errorMessage && (
                <span className="text-red-500">
                    An error occured: {errorMessage}
                </span>
            )}
                    <div className="flex">
                        <div className="w-32 m-8">
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        Sign in
                        </button>
                        </div>
                        <div className="w-32 m-8">
                            <Link href="/register">
                                <button onClick={()=>setIsOpen(false)} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    Register
                                </button>
                            </Link>                 
                        </div>
                    </div>
                </div>
                </form>
            </div>
            </Modal>
            <button type="submit" onClick={()=>setIsOpen(true)}>
                <a
                className="inline-block pl-4 mt-4 no-underline"
                aria-label="Login"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" viewBox="0 0 30 30" width="55" height="55">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                </a>
            </button>
        </>
    )
}
export default Avatar