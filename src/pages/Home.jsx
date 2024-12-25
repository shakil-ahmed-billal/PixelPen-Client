import axios from "axios"
import { format } from "date-fns"
import { Button } from "flowbite-react"
import { ArrowBigLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import imageBrand from '../assets/celebration.jpg'
import NewsLetter from "../components/NewsLeter"
import RecentBlog from "../components/RecentBlog"
import PopularBlog from "../components/PopularBlog"


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
                  <Link to={`/blog/${item._id}`}>
                    <div className="flex gap-2">
                      <div className="">
                        <img referrerPolicy="no-referrer" className="rounded-full w-24 object-cover" src={item.userPhoto} alt="" />
                      </div>
                      <div className="">
                        <p className="text-white font-semibold text-sm">Title: {item.title.slice(0, 50)}</p>
                        <p className="text-[#8F9AA5] text-xs">Date: {format(new Date(item.postTime), 'P')}</p>
                      </div>
                    </div>
                  </Link>
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
          <div className="border border-[#3D4755] rounded-lg p-5">
            <p className="text-center text-xl font-semibold  mb-4">Explore Topic</p>
            <div className="border-color" />
            <div className="space-y-2 mt-3">
              <p className="flex items-center"><ArrowBigLeft></ArrowBigLeft> Travel</p>
              <p className="flex items-center"><ArrowBigLeft></ArrowBigLeft> Technology</p>
              <p className="flex items-center"><ArrowBigLeft></ArrowBigLeft> Lifestyle</p>
              <p className="flex items-center"><ArrowBigLeft></ArrowBigLeft> Food and Cooking</p>
              <p className="flex items-center"><ArrowBigLeft></ArrowBigLeft> Finance and Business</p>
            </div>
          </div>
          <div className="border border-[#3D4755] rounded-lg p-5 mt-4">
            <p className="text-center text-xl font-semibold mb-3">Celebration</p>
            <div className="border-color mb-3"></div>
            <div className="relative">
              <img className="rounded-md" src={imageBrand} alt="" />
              <button className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full font-bold px-3">celebration</button>
            </div>
            <p className="text-xl  font-bold my-3">What Can You Do About Fashion Right Now</p>
            <div className="flex">
              <p>Katen Doe</p><span className="text-red-500">.</span><p>17 August 2024</p>
            </div>
          </div>
          <div className="border border-[#3D4755] p-3 rounded-xl my-4">
            <p className="text-xl font-bold">Tag Clouds</p>
            <div className="border-color my-4"></div>
            <div className="flex flex-wrap text-gray-400 gap-2">
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Audio</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Content</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Featured</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Image</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Inspiration</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Lifestyle</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Photo</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Pick</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Slide</p>
              <p className="border-[#3D4755] px-3 rounded-full border  py-2">#Trending</p>

            </div>
          </div>
        </div>
        {/* category section */}
        {/* resend blog section */}
        <div className="col-span-6 border-[#3F4955] border rounded-xl p-5">
          {blogs && blogs.slice(0, 6).map(blog => <RecentBlog key={blog._id} blog={blog}></RecentBlog>)}
        </div>
        {/* resend blog section */}
      </div>
      {/* extra section number 1 */}
      <div className="">
      <PopularBlog></PopularBlog>
      </div>
      {/* extra section number 1 */}
      {/* newsLater section */}
      <NewsLetter></NewsLetter>
      {/* newsLater section */}
      
    </div>
  )
}

export default Home
