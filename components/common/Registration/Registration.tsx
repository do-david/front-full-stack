import { FC, useState } from 'react'
import { useRouter } from 'next/router'

const Registration:FC = () => {
    const route = useRouter();
    const [formState,setFormState] = useState({firstName:'',lastName:'',email:'',password:'',age:0,isAdmin:true});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(!formState.email || !formState.password){
            setErrorMessage('Fields email and password are required')
            return
        }
        const myBody = JSON.stringify(formState)
       fetch('https://full-stack1.herokuapp.com/api/v1/register',{method: "POST",headers: {"Content-type": "Application/json"},body: myBody})
       .then(res => res.json())
       .then(data=> {
            setSuccessMessage('Thank you for your registration');
            let token = data.token;
            localStorage.setItem('token',token);
       })
       .catch((err)=> console.log(err));
    }
    return (
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={(e)=> handleSubmit(e)} method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">First name</label>
                                <input type="text" name="first_name" id="first_name"  onChange={e=>setFormState({...formState, firstName: e.target.value})} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input type="number" name="age" id="age" onChange={e=>setFormState({...formState, age: e.target.valueAsNumber})} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-auto shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Last name</label>
                                <input type="text" name="last_name" id="last_name"  onChange={e=>setFormState({...formState, lastName: e.target.value})} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Email address*</label>
                                <input type="email" name="email_address" id="email_address" onChange={e=>setFormState({...formState, email: e.target.value})} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Password*</label>
                                <input type="password" name="subject" id="subject" onChange={e=>setFormState({...formState, password: e.target.value})} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <span className="text-red-600">{errorMessage}</span>
                                <span className="text-green-600">{successMessage}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" className="group relative py-2 px-12 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        Register
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Registration