import { Select, Textarea, TextInput } from 'flowbite-react';
import { useState } from "react";
import toast from "react-hot-toast";
import logo from '../assets/log.jpg';
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddBlog = () => {

    const [blogImage, setImage] = useState('')
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()



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

        const blog = { title, imageURL, shortDescription, longDescription, category, postTime, userName, userEmail, userPhoto, comment: 0 }


        const { data } = await axiosSecure.post(`/add-blog`, blog)

        if (data) {
            toast.success('blog post successfully')
        } else {
            toast.error('blog cannot post')
        }

    }

    return (
        <div>
            <div className='md:grid grid-cols-2 justify-center items-center mt-10'>
                <div className="h-[520px] object-cover">
                    <img className="h-full w-full object-cover" src={blogImage ? blogImage : logo} alt="" />
                </div>
                <section className=' p-2 md:p-6 mx-auto border dark:border-[#3D4755] rounded-md shadow-md '>
                    <h2 className='text-xl font-bold capitalize '>
                        Post a Blog
                    </h2>

                    <form onSubmit={handleForm} className="font-semibold">
                        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                            <div>
                                <label className='' htmlFor='job_title'>
                                    Post Title
                                </label>
                                <TextInput
                                    id='title'
                                    name='title'
                                    type='text'
                                />
                            </div>
                            <div>
                                <label htmlFor='emailAddress'>
                                    Image URL
                                </label>
                                <TextInput
                                    id='url'
                                    type='url'
                                    name='imageURL'
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='' htmlFor='category'>
                                    Category
                                </label>
                                <Select
                                    name='category'
                                    id='category'
                                >
                                    <option value='Travel'>Travel</option>
                                    <option value='Technology'>Technology</option>
                                    <option value='Lifestyle'>Lifestyle</option>
                                    <option value='Food and Cooking'>Food and Cooking</option>
                                    <option value='Finance and Business'>Finance and Business</option>
                                </Select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className=' ' htmlFor='description'>
                                Sort Description
                            </label>
                            <Textarea
                                name='sort_description'
                                id='description'
                            ></Textarea>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className='' htmlFor='description'>
                                Long Description
                            </label>
                            <Textarea
                                name='long_description'
                                id='description'
                            ></Textarea>
                        </div>
                        <div className='flex justify-end mt-6'>
                            <button className='btn-custom'>
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
