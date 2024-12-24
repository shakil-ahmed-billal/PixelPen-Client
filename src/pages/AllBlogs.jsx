/* eslint-disable react-hooks/rules-of-hooks */
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
    const [itemPerPage , setItemPerPage] = useState(4)
    const [currentPage , setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(result / itemPerPage)

    const pages = [...Array(numberOfPages).keys()];
    // for (let i = 0; i < numberOfPages; i++) {
    //     pages.push(i + 1)

    // }
    console.log(currentPage)


    useEffect(() => {
        const handleData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_LINK}/all-posts?category=${category}&search=${search}&page=${currentPage}&size=${itemPerPage}`)
            setBlogs(data)
        }
        handleData()
    }, [search, category , itemPerPage , currentPage])

    const handlePage = (data) =>{
        setItemPerPage(data)
        setCurrentPage(0)
    }

    return (
        <div>
            <div className="flex gap-5 mt-5 justify-between">
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
                <Link className='btn-custom'>Blog Post</Link>
            </div>
            {loading ? <p>Loading</p> : <div className="">
                <div className="grid grid-cols-2 gap-10 my-10">
                    {blogs && blogs?.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)}
                </div>
            </div>}
            <div className="w-full flex justify-center">
                <p>page:{currentPage}</p>
                {pages.map(item => <button onClick={()=>setCurrentPage(item)} className={currentPage == item? 'btn-custom border-2' : 'btn-custom'} key={item}>{item}</button>)}
                <Select onChange={(e) => handlePage(parseInt(e.target.value))} id="countries" required>
                        <option selected disabled value='Web Development'>page</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        
                    </Select>
            </div>
        </div>
    )
}

export default AllBlogs
