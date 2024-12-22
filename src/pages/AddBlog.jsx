import { useState } from "react"
import axios from 'axios'
import useAuth from "../hooks/useAuth"
const AddBlog = () => {

    const [blogImage, setImage] = useState('')
    const {user} = useAuth()

    console.log(user)

    const handleForm = async (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const imageURL = blogImage;
        const shortDescription = form.sort_description.value;
        const longDescription = form.long_description.value;
        const category = form.category.value;
        const postTime = new Date()
        const userName = user.displayName;
        const userEmail = user.email;
        const userPhoto = user.photoURL;

        const blog = { title, imageURL, shortDescription, longDescription, category  , postTime , userName , userEmail ,userPhoto , comment:0}
        console.log(blog)

        const {data} = await axios.post(`${import.meta.env.VITE_LINK}/add-blog` , blog)
        console.log(data)

    }

    return (
        <div>
            <div className='flex justify-center items-center mt-10'>
                <div className="w-6/12 h-full object-cover">
                    <img src={blogImage && blogImage} alt="" />
                </div>
                <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
                    <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                        Post a Job
                    </h2>

                    <form onSubmit={handleForm}>
                        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                            <div>
                                <label className='text-gray-700 ' htmlFor='job_title'>
                                    Post Title
                                </label>
                                <input
                                    id='title'
                                    name='title'
                                    type='text'
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div>
                                <label className='text-gray-700 ' htmlFor='emailAddress'>
                                    Image URL
                                </label>
                                <input
                                    id='url'
                                    type='url'
                                    name='imageURL'
                                    onChange={(e) => setImage(e.target.value)}
                                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div className='flex flex-col gap-2 dark:text-slate-800'>
                                <label className='' htmlFor='category'>
                                    Category
                                </label>
                                <select
                                    name='category'
                                    id='category'
                                    className='border p-2 rounded-md'
                                >
                                    <option value='Web Development'>Travel</option>
                                    <option value='Graphics Design'>Technology</option>
                                    <option value='Digital Marketing'>Lifestyle</option>
                                    <option value='Digital Marketing'>Food and Cooking</option>
                                    <option value='Digital Marketing'>Finance and Business</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='text-gray-700 ' htmlFor='description'>
                                Sort Description
                            </label>
                            <textarea
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                name='sort_description'
                                id='description'
                            ></textarea>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='text-gray-700 ' htmlFor='description'>
                                Long Description
                            </label>
                            <textarea
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                name='long_description'
                                id='description'
                            ></textarea>
                        </div>
                        <div className='flex justify-end mt-6'>
                            <button className='disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
                                {/* {isPending ? 'Saving...' : 'Save'} */} Post Blog
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default AddBlog
