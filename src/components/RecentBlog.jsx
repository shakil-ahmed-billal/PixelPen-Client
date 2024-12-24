import { ClockArrowUp, ListCollapse, MessageCircle } from 'lucide-react'
import React from 'react'

const RecentBlog = ({ blog }) => {

    const { title, imageURL, shortDescription, longDescription, category, postTime, userName, userEmail, userPhoto, comment, _id } = blog || {}

    return (
        <div className='border-b border-gray-700 mb-2'>
            <div className="flex gap-4 p-3">
                <div className="">
                    <img className='object-cover h-52 w-[400px] rounded-lg' src={imageURL} alt="" />
                </div>
                <div className="">
                <div className="flex gap-3 items-center">
                    <img src={userPhoto} className='w-10 h-10 object-cover rounded-full' alt="" />
                    <p>{userName}</p><span className='text-[#FE4F70]'>.</span><p>{category}</p>
                    <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
                    <p className='flex items-center gap-1'><MessageCircle />{comment}</p>
                </div>
                <p className='text-2xl font-semibold my-3'>{title}</p>
                <p className='text-[#8F9BAD]'>{shortDescription.slice(0,140)}....</p>
                <div className="flex justify-between text-[#818E9F] mt-1">
                    <button><ClockArrowUp /></button>
                    <button><ListCollapse /></button>
                </div>
                </div>

            </div>
        </div>
    )
}

export default RecentBlog
