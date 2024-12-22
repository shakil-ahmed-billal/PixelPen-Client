import axios from "axios"
import { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"

const Home = () => {

  const [blogs , setBlogs] = useState([])

  useEffect(()=>{



    const handleData = async () =>{
      const {data} = await axios.get('http://localhost:5000/all-blogs')
      setBlogs(data)
    }
    handleData()
  },[])


  return (
    <div>


      <div className="">
        {/* resend blog section */}
          <div className="grid grid-cols-3 gap-10 my-10">
          {blogs&& blogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
          </div>
        {/* resend blog section */}
      </div>
    </div>
  )
}

export default Home
