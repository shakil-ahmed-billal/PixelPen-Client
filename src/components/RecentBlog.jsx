import { ClockArrowUp, Eye, ListCollapse, MessageCircle } from 'lucide-react'
import React from 'react'
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const RecentBlog = ({ blog }) => {
    


    const {user} = useAuth()
    const { title, imageURL, shortDescription, longDescription, category, postTime, userName, userEmail, userPhoto, comment, _id } = blog || {}


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

        console.log(watchData)

        const { data } = await axios.post(`${import.meta.env.VITE_LINK}/watch-list`, watchData)
        console.log(data)
        if(data){
            toast.success('this blog add watchList')
        }
    }

    return (
        <div className='border-b border-gray-700 mb-2'>
            <div className="flex gap-4 p-3">
                <div className="">
                    <Link to={`/blog/${_id}`}>
                    <img className='object-cover h-52 w-[400px] rounded-lg' src={imageURL} alt="" /></Link>
                </div>
                <div className="">
                <div className="flex gap-3 items-center">
                    <img referrerPolicy='no-referrer' src={userPhoto} className='w-10 h-10 object-cover rounded-full' alt="" />
                    <p>{userName}</p><span className='text-[#FE4F70]'>.</span><p>{category}</p>
                    <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
                    <p className='flex items-center gap-1'><MessageCircle />{comment}</p>
                </div>
                <p className='text-2xl font-semibold my-3'>{title.slice(0,60)}.....<Link to={`/blog/${_id}`}><button>See more</button></Link></p>
                <p className='text-[#8F9BAD]'>{shortDescription.slice(0,110)}....<Link to={`/blog/${_id}`}><button>see more</button></Link></p>
                <div className="flex justify-between text-[#818E9F] mt-1">
                    <button onClick={handleWatchList}><Eye /></button>
                    <button><ListCollapse /></button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlog
