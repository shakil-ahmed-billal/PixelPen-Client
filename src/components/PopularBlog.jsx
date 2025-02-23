import axios from 'axios'
import { IterationCcw } from 'lucide-react'
import{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react';

const PopularBlog = () => {

    const [popularBlog , setPopular] = useState([])

    useEffect(()=>{
        const handleData = async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_LINK}/popular-blog`)
            setPopular(data)

        }
        handleData()
    },[])


  return (
    <div className=''>
      <div className="my-5">
        <p className='text-3xl font-bold mt-5'>Most Popular Blog Post</p>
        <div className="border-color my-5"></div>
        <div className="flex justify-center items-center flex-wrap gap-1">
            {popularBlog.map(blog => <div key={blog._id}>
                <div className="">
                    <Link to={`/blog/${blog._id}`}><motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    className='md:w-60 w-20 h-60 rounded-xl object-cover' src={blog.imageURL} alt="" /></Link>
                </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default PopularBlog
