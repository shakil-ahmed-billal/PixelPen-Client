import axios from "axios";
import { TextInput } from "flowbite-react";
import { Eye, ListCheckIcon, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";



const BlogCard = ({ blog }) => {


    const { user } = useAuth()
    const navigate = useNavigate()
    const [stateComment, setComment] = useState('')

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


        const { data } = await axios.post(`${import.meta.env.VITE_LINK}/watch-list`, watchData)

        if (data) {
            toast.success(`This Blog Add WishList Successfully`)
        }
    }

    // user comment store for database
    const handleComment = async () => {

        const commentText = stateComment



        if (!user) {
            toast.error('Please Fast LogIn Than Comment')
            return navigate('/login')
        }
        if (!commentText) {
            toast.error('Please write a message')
            return
        }
        if (userEmail === user.email) {
            toast.error('own cannot comment send')
            return
        }


        const postComment = {
            blogId: _id,
            name: user.displayName,
            email: user.email,
            commentText: commentText,
            authorPhoto: user.photoURL,
            commentLike: 0,
            commentDate: new Date()
        }



        if (user.email !== userEmail) {
            const { data } = await axios.post(`${import.meta.env.VITE_LINK}/add-comment`, postComment)

            if (data) {
                toast.success(`Comment: ${commentText}`)
            }
        } else {
            toast.error('Own cannot comment')
        }

    }

    return (
        <div>
            <div className="rounded-md h-full shadow-md border dark:border-[#818E9F] ">
                <div className="flex gap-3 items-center p-3 ">
                    <img src={userPhoto} className='w-10 h-10 object-cover rounded-full' alt="" />
                    <div className="flex flex-wrap items-center text-sm gap-1">
                        <p>{userName}</p><span className='text-[#FE4F70]'>.</span><p>{category}</p>
                        <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
                    </div>
                    <p className='flex items-center gap-1'><MessageCircle />{comment}</p>
                </div>
                <p className="p-3 md:text-2xl font-semibold">{title.slice(0, 50)} ...</p>
                <p className="text-[#818E9F] p-3">{shortDescription.slice(0, 80)}... <Link to={`blog/${_id}`}>see more</Link></p>
                <div className="">
                    <Link to={`/blog/${_id}`}>
                        <div className="relative">
                            <img src={imageURL} alt="" className="object-cover object-center w-full h-72 dark:bg-gray-500" />
                            <div className="absolute right-5 bottom-5 z-10"><button className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2 text-white"><ListCheckIcon /></button></div>
                        </div>
                    </Link>
                </div>
                <div className="p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button type="button" title="Like post" className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                            </button>
                            <button type="button" title="Add a comment" className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                                </svg>
                            </button>
                        </div>
                        <button onClick={handleWatchList} type="button" title="Bookmark post" className="flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2 mr-1 text-white">
                            <Eye />
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center pt-3 pb-1">
                        <div className="flex items-center space-x-2">
                            <div className="flex -space-x-1">
                                <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-100" src="https://source.unsplash.com/40x40/?portrait?1" />
                                <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-100" src="https://source.unsplash.com/40x40/?portrait?2" />
                                <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-100" src="https://source.unsplash.com/40x40/?portrait?3" />
                            </div>
                            <span className="text-sm">Liked by
                                <span className="font-semibold">Mamba UI</span>and
                                <span className="font-semibold">86 others</span>
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm">
                            <span className="text-base font-semibold">leroy_jenkins72</span>Nemo ea quasi debitis impedit!
                        </p>
                        <div className="w-full flex gap-3">
                            <TextInput onChange={(e) => setComment(e.target.value)} type="text" placeholder="Add a comment..." className="w-full py-0.5" spellCheck="false" data-ms-editor="true" />
                            <button onClick={handleComment} className="flex bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-3 items-center justify-center text-white"><Send></Send></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard


