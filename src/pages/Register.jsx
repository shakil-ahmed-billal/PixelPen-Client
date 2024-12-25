import { Link } from "react-router-dom"
import logo from '../assets/log.jpg'
import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"

const Register = () => {

    const {googleLogin , createUser} = useContext(AuthContext)

    const handleGoogle = () =>{
        googleLogin()
        .then(res => {
            console.log(res.user)
        })
    }

    const handleForm = (e)=>{
        e.preventDefault()
        const form = e.target;
        const photoURL = form.photoURL.value ;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // user account create option
        createUser(email , password)
        .then(res =>{
            console.log(res.user)
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-306px)] '>
            <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
                <div
                    className='hidden bg-cover bg-center lg:block lg:w-1/2'
                    style={{
                        backgroundImage: `url(${logo})`,
                    }}
                ></div>

                <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                    <div className='flex justify-center mx-auto'>
                        <img className='w-auto h-7 sm:h-8' src={logo} alt='' />
                    </div>

                    <p className='mt-3 text-xl text-center text-gray-600 '>
                        Welcome back!
                    </p>
                    <form onSubmit={handleForm}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Photo Image Link
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='photoURL'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='url'
                            />
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                User Name
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='name'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                            />
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                User Email Address
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='email'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email'
                            />
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                name='password'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='password'
                            />
                        </div>
                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  md:w-1/4'></span>

                        <Link
                            to='/login'
                            className='text-xs text-gray-500 uppercase  hover:underline'
                        >
                            or LogIn
                        </Link>

                        <span className='w-1/5 border-b  md:w-1/4'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

