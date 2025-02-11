import axios from 'axios';
import { Eye, ListCollapse, MessageCircle } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RecentBlog = ({ blog }) => {



    const { user } = useAuth()
    const { title, imageURL, shortDescription, category, userName, userPhoto, comment, _id } = blog || {}


    const handleWatchList = async () => {
        const watchData = {
            authorName: user.displayName,
            authorEmail: user.email,
            watchTime: new Date(),
            userName,
            userPhoto,
            blogId: _id,
            title,
            imageURL,
            category
        }



        const { data } = await axios.post(`${import.meta.env.VITE_LINK}/watch-list`, watchData)

        if (data) {
            toast.success('this blog add watchList')
        }
    }

    return (
        <div className='border-b border-gray-700 mb-2'>
            <div className="flex md:flex-row flex-col gap-4 md:p-3">
                <div className="">
                    <Link to={`/blog/${_id}`}>
                        <img className='object-cover h-52 w-[400px] rounded-lg' src={imageURL} alt="" /></Link>
                </div>
                <div className="">
                    <div className="flex flex-wrap gap-1 md:gap-3 items-center md:text-md text-sm">
                        <img referrerPolicy='no-referrer' src={userPhoto || <Skeleton></Skeleton>} className='w-10 h-10 object-cover rounded-full' alt="" />
                        <p>{userName}</p><span className='text-[#FE4F70]'>.</span><p>{category}</p>
                        <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
                        <p className='flex items-center gap-1'><MessageCircle />{comment}</p>
                    </div>
                    <p className='md:text-2xl  font-semibold my-3'>{title.slice(0, 60) || <Skeleton></Skeleton>}.....<Link to={`/blog/${_id}`}><button>See more</button></Link></p>
                    <p className='text-[#8F9BAD]'>{shortDescription.slice(0, 110) || <Skeleton count={2}></Skeleton>}....<Link to={`/blog/${_id}`}><button>see more</button></Link></p>
                    <div className="flex justify-between text-[#818E9F] mt-1">
                        <button onClick={handleWatchList}><Eye /></button>
                        <Link to={`/blog/${_id}`}><ListCollapse /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlog
