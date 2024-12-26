import axios from "axios"
import { format } from "date-fns"
import { ArrowBigLeft, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { Link } from "react-router-dom"
import blog2 from '../assets/blog2.webp'
import imageBrand from '../assets/celebration.jpg'
import NewsLetter from "../components/NewsLeter"
import PopularBlog from "../components/PopularBlog"
import RecentBlog from "../components/RecentBlog"

const Home = () => {

  const [blogs, setBlogs] = useState([])


  useEffect(() => {



    const handleData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_LINK}/all-blogs`)
      setBlogs(data)
    }
    handleData()
  }, [])


  return (
    <div>
      <motion.div className="md:grid md:grid-cols-6 my-10 gap-10">
        <div className="col-span-4 bg-hero-bg bg-cover bg-center h-full content-end p-10 rounded-3xl mb-5 md:mb-0 text-white">
          <button className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-full px-3 py-1 font-bold">Inspiration<span className=" font-bold text-rose-500 ml-2">.</span></button>
          <p className="mb-10 md:text-4xl text-lg font-bold ">5 Easy Ways You Can Turn Future Into Success</p>
        </div>
        <div className="md:col-span-2">
          <div className="border-2 border-[#3D4755] rounded-2xl p-5">
            <div className="flex gap-3 mb-5 justify-center">
              <button className="btn-custom">Recent</button>
              <button className="py-2 px-4 rounded-full border-2">Popular</button>
            </div>
            <div className="">
              <div className="">
                {blogs.slice(0, 6).map(item => <motion.div

                  key={item._id} className="mb-3">
                  <hr className="p-1 border-[#3D4755]" />
                  <Link to={`/blog/${item._id}`}>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <div className="">
                        <motion.img
                          initial={{ scale: 0 }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{ delay: 0.1 }}
                          referrerPolicy="no-referrer"
                          className="rounded-full object-cover"
                          src={item.userPhoto} alt="" />
                      </div>
                      <div className="col-span-3">
                        <p className="dark:text-white  font-semibold text-sm">Title: {item.title.slice(0, 50)}</p>
                        <p className="text-[#8F9AA5] text-xs">Date: {format(new Date(item.postTime), 'P')}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <p className="text-3xl font-semibold">Recent Blogs Post</p>
      <p className="border-color mt-2"></p>
      <div className="md:grid md:grid-cols-8 gap-10 my-10">
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
      {/* extra section number 2 */}
      <div className="mt-16 md:grid grid-cols-3 md:gap-9">
        <div className=" col-span-2">
          <p className="md:text-6xl  font-bold ">The trick to getting more done is to have the freedom to roam around</p>
          <p className="my-5">Explore the advancements in renewable energy technologies and how they are transforming the global energy landscape. Learn about the benefits, challenges, and future prospects of harnessing sustainable power sources.</p>
          <div className="">
            <div className="flex gap-3 md:my-3 items-center py-3">
              <PhotoProvider>
                <PhotoView src=''>
                  <img src='https://i.ibb.co.com/VMY2Qq7/Leonardo-Kino-XL-Generate-a-clean-cartoonstyle-illustration-of-0-2.jpg' className='w-10 h-10 object-cover rounded-full' alt="" />
                </PhotoView>
              </PhotoProvider>
              <p>Shakil</p><span className='text-[#FE4F70]'>.</span><p>Model</p>
              <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
              <p className='flex items-center gap-2'><MessageCircle />6</p>
            </div>
            <div className="">
              <img className=" md:h-[650px] w-full object-cover rounded-3xl" src={blog2} alt="" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <p>WRITTEN BY</p>
            <div className="grid rounded-md broder-[#3D4755] border p-3 grid-cols-6 gap-3 items-center">
              <div className="col-span-2">
                <PhotoProvider>
                  <PhotoView src=''>
                    <img src='https://i.ibb.co.com/VMY2Qq7/Leonardo-Kino-XL-Generate-a-clean-cartoonstyle-illustration-of-0-2.jpg' className='w-24 h-24 object-cover rounded-full' alt="" />
                  </PhotoView>
                </PhotoProvider>
              </div>
              <div className="col-span-4">
                <p className="font-bold">Shakil Ahmed</p>
                <p>Wind power is another renewable energy.....</p>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <p className="font-bold text-xl my-5">Explore Blogs Choice</p>
            {blogs.slice(0, 6).map(item => <motion.div

              key={item._id} className="mb-3">
              <hr className="p-1 border-[#3D4755]" />
              <Link to={`/blog/${item._id}`}>
                <div className="grid grid-cols-4 items-center gap-2">
                  <div className="">
                    <motion.img
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{ delay: 0.1 }}
                      referrerPolicy="no-referrer"
                      className="h-20 w-28 object-cover"
                      src={item.imageURL} alt="" />
                  </div>
                  <div className="col-span-3">
                    <p className="font-bold">Post By: {item.userName}</p>
                    <p className="dark:text-white  font-semibold text-sm">Title: {item.title.slice(0, 50)}</p>
                    <p className="text-[#8F9AA5] text-xs">Date: {format(new Date(item.postTime), 'P')}</p>
                  </div>
                </div>
              </Link>
            </motion.div>)}
          </div>
          <div className="">
            <p className="text-center text-6xl text-red-600">....</p>
            <p className="text-center text-lg font-bold">Nullam auctor nisi non tortor porta, id dapibus lectus rhoncus. Vivamus lobortis posuere enim finibus sodales.</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="my-10">The global energy landscape is undergoing a significant transformation as renewable energy technologies continue to advance and gain widespread adoption. With growing concerns about climate change and the depletion of fossil fuels, renewable energy sources such as solar, wind, hydro, and geothermal power are emerging as viable and sustainable alternatives to traditional energy generation methods.

          One of the most notable advancements in renewable energy is the rapid growth of solar power. Solar photovoltaic (PV) panels have become more efficient and affordable, enabling homeowners and businesses to generate their own electricity from the sun. Innovations such as solar roof tiles and building-integrated photovoltaics (BIPV) are further expanding the potential of solar energy, seamlessly integrating solar panels into building structures.

          Wind power is another renewable energy source that has seen significant advancements. Modern wind turbines are more efficient and capable of generating electricity even in low-wind conditions. Offshore wind farms, which harness the strong and consistent winds over the ocean, are becoming increasingly popular and are expected to play a crucial role in the future energy mix.</p>
      </div>
      {/* extra section number 2 */}
      {/* newsLater section */}
      <NewsLetter></NewsLetter>
      {/* newsLater section */}

    </div>
  )
}

export default Home
