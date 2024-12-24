import axios from "axios"
import { format } from "date-fns"
import { Button } from "flowbite-react"
import { useEffect, useState } from "react"
import NewsLetter from "../components/NewsLeter"
import RecentBlog from "../components/RecentBlog"

const Home = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {



    const handleData = async () => {
      const { data } = await axios.get('http://localhost:5000/all-blogs')
      setBlogs(data)
    }
    handleData()
  }, [])


  return (
    <div>
      <div className="grid grid-cols-6 my-10 gap-10">
        <div className="col-span-4 bg-hero-bg bg-cover bg-center h-full content-end p-10 rounded-3xl">
          <button className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-full px-3 py-1">inspiration<span className=" font-bold text-rose-500 ml-2">.</span></button>
          <p className="mb-10 text-4xl font-bold ">5 Easy Ways You Can Turn Future Into Success</p>
        </div>
        <div className="col-span-2">
          <div className="border-2 border-[#3D4755] rounded-2xl p-5">
            <div className="flex gap-3 mb-5 justify-center">
              <Button>Popular</Button>
              <Button>Recent</Button>
            </div>
            <div className="">
              <div className="">
                {blogs.slice(0, 5).map(item => <div key={item._id} className="mb-3">
                  <hr className="p-1 border-[#3D4755]" />
                  <div className="flex gap-2">
                    <div className="">
                      <img className="rounded-full w-24 object-cover" src={item.userPhoto} alt="" />
                    </div>
                    <div className="">
                      <p className="text-white font-semibold text-sm">Name: {item.title.slice(0, 50)}</p>
                      <p className="text-[#8F9AA5] text-xs">Date: {format(new Date(item.postTime), 'P')}</p>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-3xl font-semibold">Latest Posts</p>
      <p className="border-color mt-2"></p>
      <div className="grid grid-cols-8 gap-10 my-10">
        {/* category section */}
        <div className="col-span-2">

        </div>
        {/* category section */}
        {/* resend blog section */}
        <div className="col-span-6 border-[#3F4955] border rounded-xl p-5">
          {blogs && blogs.slice(0, 6).map(blog => <RecentBlog key={blog._id} blog={blog}></RecentBlog>)}
        </div>
        {/* resend blog section */}
      </div>
      {/* newsLater section */}
      <NewsLetter></NewsLetter>
      {/* newsLater section */}
    </div>
  )
}

export default Home
