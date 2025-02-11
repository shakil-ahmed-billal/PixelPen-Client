
import axios from 'axios'
import { Select, TextInput } from 'flowbite-react'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import useAuth from '../hooks/useAuth'

const AllBlogs = () => {

    const { result } = useLoaderData()
    const [blogs, setBlogs] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const { loading } = useAuth()

    // pagination function make
    const [itemPerPage, setItemPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(result / itemPerPage)

    const pages = [...Array(numberOfPages).keys()];
    // for (let i = 0; i < numberOfPages; i++) {
    //     pages.push(i + 1)

    // }



    useEffect(() => {
        const handleData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_LINK}/all-posts?category=${category}&search=${search}&page=${currentPage}&size=${itemPerPage}`)
            setBlogs(data)
        }
        handleData()
    }, [search, category, itemPerPage, currentPage])

    const handlePage = (data) => {
        setItemPerPage(data)
        setCurrentPage(0)
    }

    return (
        <div>
            <div className="md:flex gap-5 mt-5 justify-between">
                <div className="flex gap-2">
                    <div className="relative">
                        <TextInput onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                        <Search className="absolute right-2 top-[9px] text-[1.5rem] text-[#adadad]" />
                    </div>
                    <Select onChange={(e) => setCategory(e.target.value)} id="countries" required>
                        <option selected disabled value='Web Development'>Category</option>
                        <option value='Travel'>Travel</option>
                        <option value='Technology'>Technology</option>
                        <option value='Lifestyle'>Lifestyle</option>
                        <option value='Food and Cooking'>Food and Cooking</option>
                        <option value='Finance and Business'>Finance and Business</option>
                    </Select>
                </div>
                <Link to={`/add-blog`} ><button className='btn-custom md:mt-0 mt-4'>Blog Post</button></Link>
            </div>
            {loading ? <p>Loading</p> : <div className="">
                <div className="md:grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 gap-10 my-10">
                    {blogs && blogs?.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
                </div>
            </div>}
            <div className="w-full gap-2 flex flex-wrap justify-center">
                {pages.map(item => <button onClick={() => setCurrentPage(item)} className={currentPage == item ? ' bg-gradient-to-r from-pink-500 to-orange-500 text-white border-white border-2 font-bold w-10 h-10 rounded-full ' : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold w-10 h-10 rounded-full'} key={item}>{item}</button>)}
                <Select onChange={(e) => handlePage(parseInt(e.target.value))} id="countries" required>
                    <option selected disabled value='Web Development'>{itemPerPage}</option>
                    <option value='2'>2</option>
                    <option value='4'>4</option>
                    <option value='6'>6</option>
                    <option value='8'>8</option>

                </Select>
            </div>
        </div>
    )
}

export default AllBlogs
