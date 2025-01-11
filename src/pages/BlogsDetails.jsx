import axios from 'axios'
import { format } from 'date-fns'
import { Label, Textarea } from 'flowbite-react'
import { Edit, Eye, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const BlogsDetails = () => {
    const { id } = useParams()

    const [details, setDetails] = useState({})
    const [commentData, setCommentData] = useState([])
    const navigate = useNavigate()
    const { user } = useAuth()


    const { title, imageURL, shortDescription, longDescription, category, postTime, userName, userEmail, userPhoto, _id, comment } = details[0] || {}


    useEffect(() => {
        const handleData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_LINK}/blog/${id}`)
            setDetails(data)
           
        }
        handleData()
        handleCommentData()
    }, [id])

    const handleCommentData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_LINK}/comment/${id}`)
        setCommentData(data)

    }

    const handleWatchList = async () => {
        if (!user) {
            return navigate(`/login`)
        }
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
            toast.success('This blog add WishList ✔️')
        }
    }



    const handleComment = async (e) => {
        e.preventDefault()

        const form = e.target;
        const commentText = form.comment.value;
    


        if (!user) {
            toast.error('Please Fast LogIn Than Comment')
            return navigate('/login')
        }
        if(!commentText){
            toast.error('Please write a message')
            return
        }

        const postComment = {
            blogId: _id,
            name: user.displayName,
            email: user.email,
            commentText: e.target.comment.value,
            authorPhoto: user.photoURL,
            commentLike: 0,
            commentDate: new Date()
        }
 


        if (user?.email !== userEmail) {
            const { data } = await axios.post(`${import.meta.env.VITE_LINK}/add-comment`, postComment)
       
            if (data) {
                handleCommentData()
                toast.success(`Comment: ${commentText}`)
            }
        } else {
            toast.error('Own cannot comment')
        }

    }

    return (
        <div className='md:grid grid-cols-6 gap-3'>
            <div className="col-span-4">
                <div className="my-5 relative">
                    <p className='text-[#8F9BAD] py-3'>PixelPen / {category} / {title?.slice(0, 50)}</p>
                    <p className='md:text-4xl font-bold dark:text-white'>{title || <Skeleton></Skeleton>}</p>
                    <div className="flex flex-wrap justify-between items-center ">
                        <div className="flex gap-3 md:my-3 items-center py-3 md:text-md text-sm">
                            <PhotoProvider>
                                <PhotoView src={userPhoto}>
                                    <img src={userPhoto} className='w-10 h-10 object-cover rounded-full' alt="" />
                                </PhotoView>
                            </PhotoProvider>
                            <p>{userName}</p><span className='text-[#FE4F70]'>.</span><p>{category}</p>
                            <span className='text-[#FE4F70]'>.</span><p>Date: 12/12/12</p> <span className='text-[#FE4F70]'>.</span>
                            <p className='flex items-center gap-2'><MessageCircle />{comment}</p>
                        </div>
                        <div className="mr-5 md:flex md:relative absolute right-0  md:bottom-0 -bottom-12">
                            <button onClick={handleWatchList} className=' bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2 md:p-3 mr-2'><Eye /></button>
                            <Link to={`/update-blog/${_id}`}><button disabled={user?.email !== userEmail} className=' bg-gradient-to-r from-red-500 to-yellow-500 rounded-full p-2 md:p-3'><Edit></Edit></button></Link>
                        </div>
                    </div>
                    <div className="">
                        <PhotoProvider>
                            <PhotoView src={imageURL}>
                                <img className='w-full h-[450px] object-cover' src={imageURL} alt="" />
                            </PhotoView>
                        </PhotoProvider>
                        <p className='py-10'>{shortDescription || <Skeleton count={2}></Skeleton>}</p>
                        <p>{longDescription || <Skeleton count={5}></Skeleton>}</p>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="">
                    <form onSubmit={handleComment}>
                        <div className="mb-2 block mt-5">
                            {user?.email !== userEmail?<Label className='text-2xl' htmlFor="comment" value="Your message" />: <p className='text-2xl font-semibold text-rose-600'>Own Cannot Comment send</p>}
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
                                    <p className='dark:text-white font-semibold text-sm'>Name: {item.name}</p>
                                    <p className="dark:text-white font-semibold text-sm">Comment: {item.commentText}</p>
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
