import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import useAuth from '../hooks/useAuth'

const AllBlogs = () => {

    const [blogs, setBlogs] = useState([])
    const {loading} = useAuth()


    useEffect(() => {
        const handleData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_LINK}/all-blogs`)
            setBlogs(data)
        }
        handleData()
    }, [])

    console.log(blogs)


    return (
        <div>
            {loading ? <p>Loading</p> : <div className="">
                <div className="grid grid-cols-3 gap-10 my-10">
                    {blogs&& blogs?.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
                </div>
            </div>}
        </div>
    )
}

export default AllBlogs
