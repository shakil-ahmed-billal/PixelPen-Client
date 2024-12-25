import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/log.jpg'
import { AuthContext } from "../provider/AuthProvider"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

const Register = () => {

    const { googleLogin, createUser , userUpdate } = useContext(AuthContext)
    const navigate = useNavigate()

    // const handleGoogle = () => {
    //     googleLogin()
    //         .then(res => {
    //             console.log(res.user)
    //         })
    // }

    const handleForm = (e) => {
        e.preventDefault()
        const form = e.target;
        const photoURL = form.photoURL.value;
        const name = form.name.value;
        const email = form.email.value;
        const password = StrongPassword;

        // user account create option
        if(strengthProgress == 100){
            console.log(password)
            createUser(email, password)
            .then(res => {
                userUpdate({displayName: name , photoURL})
                .then(res=>{
                    toast.success(`Register Successful ${res.user.displayName}`)
                    navigate('/')
                })
            }).catch(error => {
                toast.error(error.message)
            })
        }else{
            toast.error('Please use Strong Password')
        }
    }

    // strong password system make
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [StrongPassword, setStrongPassword] = useState("");
    const [signal, setSignal] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
        length: false,
        strong: false
    });

    const countTrueItems = (obj) => {
        const totalItems = Object.keys(obj).length;
        const trueItems = Object.values(obj).filter((item) => item).length;
        return (trueItems / totalItems) * 100;
    };

    const strengthProgress = Math.floor(countTrueItems(signal));

    const handleStrongPasswordChecker = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setSignal({
            lowercase: hasLowerCase,
            uppercase: hasUpperCase,
            number: hasNumber,
            symbol: hasSymbol,
            length: password.length >= 6,
            strong: hasUpperCase && hasLowerCase && hasNumber && hasSymbol && password.length >= 8
        });
    }
    console.log(StrongPassword)
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
                                required
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
                                required
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
                                required
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email'
                            />
                        </div>

                        <div className='mt-4 relative'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                type={isEyeOpen ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                                onChange={handleStrongPasswordChecker}
                                autoComplete='current-password'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            />
                            <div className="w-full mt-2 flex items-center gap-[5px]">
                            <div
                                className={`${strengthProgress > 0 ? "bg-green-500" : "bg-gray-200"} h-[9px] w-full rounded-md`}></div>
                            <div
                                className={`${strengthProgress > 16 ? "bg-green-500" : "bg-gray-200"} h-[9px] w-full rounded-md`}></div>
                            <div
                                className={`${strengthProgress > 33 ? "bg-green-500" : "bg-gray-200"} h-[9px] w-full rounded-md`}></div>
                            <div
                                className={`${strengthProgress > 50 ? "bg-green-500" : "bg-gray-200"} h-[9px] w-full rounded-md`}></div>
                            <div
                                className={`${strengthProgress == 100 ? "bg-green-500" : "bg-gray-200"} h-[9px] w-full rounded-md`}></div>

                        </div>
                        {isEyeOpen ? (
                                      <Eye 
                                          className=" absolute top-9 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                                          onClick={() => setIsEyeOpen(false)}
                                      />
                                  ) : (
                                      <EyeOff 
                                          className=" absolute top-9 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                                          onClick={() => setIsEyeOpen(true)}
                                      />
                                  )}
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

