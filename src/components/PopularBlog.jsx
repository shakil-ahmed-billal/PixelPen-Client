import axios from 'axios'
import { IterationCcw } from 'lucide-react'
import{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PopularBlog = () => {

    const [popularBlog , setPopular] = useState([])

    useEffect(()=>{
        const handleData = async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_LINK}/popular-blog`)
            setPopular(data)
        }
        handleData()
    },[])

    console.log(popularBlog)
  return (
    <div>
      <div className="my-5">
        <p className='text-3xl font-bold mt-5'>Most Popular Blog Post</p>
        <div className="border-color my-5"></div>
        <div className="flex flex-wrap gap-1">
            {popularBlog.map(blog => <div key={blog._id}>
                <div className="">
                    <Link to={`/blog/${blog._id}`}><img className='w-40 h-40 rounded-xl object-cover' src={blog.imageURL} alt="" /></Link>
                </div>
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default PopularBlog
