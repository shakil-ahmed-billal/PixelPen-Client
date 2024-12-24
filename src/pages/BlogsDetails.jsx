import axios from 'axios'
import { format } from 'date-fns'
import { Button, Label, Textarea } from 'flowbite-react'
import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const BlogsDetails = () => {
    const { id } = useParams()

    const [details, setDetails] = useState({})
    const [commentData, setCommentData] = useState([])
    const { user } = useAuth()


    const { title, imageURL, shortDescription, longDescription, category, postTime, userName, userEmail, userPhoto, _id, message } = details[0] || {}


    useEffect(() => {
        const handleData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_LINK}/blog/${id}`)
            setDetails(data)
            // console.log(data)
        }
        handleData()
        handleCommentData()
    }, [id])

    const handleCommentData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_LINK}/comment/${id}`)
        setCommentData(data)
        console.log(data)
    }

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
    }

    console.log(commentData)

    const handleComment = async (e) => {
        e.preventDefault()

        const form = e.target;
        const commentText = form.comment.value;
        console.log(commentText)

        const postComment = {
            blogId: _id,
            name: user.displayName,
            email: user.email,
            commentText: e.target.comment.value,
            authorPhoto: user.photoURL,
            commentLike: 0,
            commentDate: new Date()
        }
        console.log(postComment)

        const { data } = await axios.post(`${import.meta.env.VITE_LINK}/add-comment`, postComment)
        console.log(data)
        if (data) {
            handleCommentData()
        }
    }

    return (
        <div className='grid grid-cols-6 gap-3'>
            <div className="col-span-4">
                <div className="my-5">
                    <p className='text-[#8F9BAD] py-3'>PixelPen / {category} / {title?.slice(0, 50)}</p>
                    <p className='text-4xl font-bold text-white'>{title}</p>
                    <div className="flex gap-3 my-3 items-center py-3">
                        <img src={userPhoto} className='w-10 h-10 object-cover rounded-full' alt="" />
                        <p>{userName}</p><span className='text-[#FE4F70]'>.</span><p>{category}</p>
                        <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
                        <p><MessageCircle />{message}</p>
                    </div>
                    <div className="">
                        <img className='w-full h-[450px] object-cover' src={imageURL} alt="" />
                        <p className='py-10'>{shortDescription}</p>
                        <p>{longDescription}</p>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="">
                    <form onSubmit={handleComment}>
                        <div className="mb-2 block mt-5">
                            <Label className='text-2xl' htmlFor="comment" value="Your message" />
                        </div>
                        <div className="flex gap-3">
                            <Textarea name='comment' id="comment" className='w-full' placeholder="Leave a comment..." required rows={1} />
                            <div className="">
                                <button className='btn-custom'>Comment</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-3">
                    {commentData && commentData.map(item => <div key={item._id} className=''>
                        <div className="flex gap-2 w-full mb-2">
                            {/* <hr className="p-1 border-[#3D4755]" /> */}
                            <div className="flex gap-2 border-2 border-[#3D4755] w-full  rounded-2xl p-2">
                                <div className="">
                                    <img className="rounded-full w-16 object-cover" src={item.authorPhoto} alt="" />
                                </div>
                                <div className="">
                                    <p className='text-white font-semibold text-sm'>Name: {item.name}</p>
                                    <p className="text-white font-semibold text-sm">Comment: {item.commentText}</p>
                                    <p className="text-[#8F9AA5] text-xs">Date: {format(new Date(item.commentDate), 'P')}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default BlogsDetails
