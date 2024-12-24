
import { createBrowserRouter  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import AddBlog from "../pages/AddBlog";
import BlogsDetails from "../pages/BlogsDetails";
import AllBlogs from "../pages/AllBlogs";
import UpdateBlog from "../pages/UpdateBlog";
import FeatureBlog from "../pages/FeatureBlog";
import WatchList from "../pages/WatchList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/add-blog',
                element: <AddBlog></AddBlog>
            },
            {
                path: '/blog/:id',
                element: <BlogsDetails></BlogsDetails>
            },
            {
                path: '/all-blogs',
                element: <AllBlogs></AllBlogs>,
                loader: ()=> fetch(`${import.meta.env.VITE_LINK}/blogsCount`)
            },
            {
                path: '/update-blog/:id',
                element: <UpdateBlog></UpdateBlog>
            },
            {
                path: '/feature-blog',
                element: <FeatureBlog></FeatureBlog>
            },
            {
                path: '/watch-list' , 
                element: <WatchList></WatchList>
            }
        ]
    }
])
export default router

