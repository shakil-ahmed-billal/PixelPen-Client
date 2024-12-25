import axios from "axios"
import { Navigate, useLocation } from "react-router-dom"
import useAuth from "./useAuth"
import { useEffect } from "react"
import toast from "react-hot-toast"


// base url set or credential add
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_LINK,
    withCredentials: true,
})

const useAxiosSecure = () => {

    const {LogOutUser} = useAuth()
    const location = useLocation()

    useEffect(()=>{
        // token verify by axios interceptor
        axiosSecure.interceptors.response.use(

            // then token true by this res
            res =>{
                return res
            },

            // or token false logout user for error
            async error =>{
                toast.error('error form user token interceptor')
                error.response

                // condition render of status
                if(error.response.status === 401){
                    LogOutUser()
                    return <Navigate to={'/login'} state={location?.state}></Navigate>
                }
            }
        )
    },[LogOutUser , location])
    return axiosSecure
}

export default useAxiosSecure 
