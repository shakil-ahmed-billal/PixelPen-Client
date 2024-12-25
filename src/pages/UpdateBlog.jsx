import { useEffect, useState } from "react"
import axios from 'axios'
import useAuth from "../hooks/useAuth"
import { useParams } from "react-router-dom"
import { Select, Textarea, TextInput } from "flowbite-react"
import toast from "react-hot-toast"
const UpdateBlog = () => {

    const {user} = useAuth()
    const {id} = useParams()
    const [details , setDetails] = useState([])
    
    
    const {title, imageURL, shortDescription , longDescription, category, postTime, userName, userEmail, userPhoto, _id } = details[0] || {}

    const [blogImage, setImage] = useState('')

    useEffect(()=>{
        const blogsData = async()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_LINK}/blog/${id}`)
            setDetails(data)
            console.log(data)
        }
        blogsData()
        setImage(imageURL)
    }, [id , setDetails , imageURL])


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

        const {data} = await axios.put(`${import.meta.env.VITE_LINK}/update-blog/${_id}` , blog)
        console.log(data)
        if(data){
            toast.success('blog information update')
        }else{
            toast.error('cannot update this information')
        }
    }

    return (
        <div>
            <div className='grid grid-cols-2 justify-center items-center mt-10'>
                <div className="h-[520px] object-cover">
                    <img className="h-full w-full object-cover" src={blogImage && blogImage} alt="" />
                </div>
                <section className=' p-2 md:p-6 mx-auto border border-[#3D4755] rounded-md shadow-md '>
                    <h2 className='text-lg font-semibold capitalize '>
                        Update a Job
                    </h2>

                    <form onSubmit={handleForm}>
                        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                            <div>
                                <label className='t' htmlFor='job_title'>
                                    Update Title
                                </label>
                                <TextInput
                                    id='title'
                                    name='title'
                                    type='text'
                                    defaultValue={title}
                                    required
                                />
                            </div>
                            <div>
                                <label className='' htmlFor='emailAddress'>
                                    Image URL
                                </label>
                                <TextInput
                                    id='url'
                                    type='url'
                                    name='imageURL'
                                    defaultValue={imageURL}
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <label className='' htmlFor='category'>
                                    Category
                                </label>
                                <Select
                                    name='category'
                                    defaultValue={category}
                                    id='category'
                                    className=''
                                    required
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
                            <label className='' htmlFor='description'>
                                Sort Description
                            </label>
                            <Textarea
                                defaultValue={shortDescription}
                                required
                                name='sort_description'
                                id='description'
                            ></Textarea>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className=' ' htmlFor='description'>
                                Long Description
                            </label>
                            <Textarea
                                defaultValue={longDescription}
                                name='long_description'
                                id='description'
                                required={true}
                            ></Textarea>
                        </div>
                        <div className='flex justify-end mt-6'>
                            <button className='btn-custom'>
                                {/* {isPending ? 'Saving...' : 'Save'} */} Update Blog
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default UpdateBlog

