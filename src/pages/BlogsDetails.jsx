import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogsDetails = () => {
    const {id} = useParams()

    const [details , setDetails]  = useState({})

    useEffect(()=>{
        const handleData = async() =>{
            const {data} = await axios.get(`${import.meta.env.VITE_LIVE}/blog/${id}`)
            setDetails(data)
            console.log(data)
        }
        handleData()
    },[id])
    console.log(details)
  return (
    <div>
      
    </div>
  )
}

export default BlogsDetails
