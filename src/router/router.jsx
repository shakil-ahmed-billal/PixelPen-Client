
import { createBrowserRouter  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import AddBlog from "../pages/AddBlog";
import BlogsDetails from "../pages/BlogsDetails";
import AllBlogs from "../pages/AllBlogs";
import UpdateBlog from "../pages/UpdateBlog";

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
                element: <AllBlogs></AllBlogs>
            },
            {
                path: '/update-blog/:id',
                element: <UpdateBlog></UpdateBlog>
            }
        ]
    }
])

export default router

