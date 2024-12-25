
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
import PrivateRoute from "../private/PrivateRoute";
import Register from "../pages/Register";

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
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/add-blog',
                element: <PrivateRoute>
                    <AddBlog></AddBlog>
                </PrivateRoute>
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
                element: <PrivateRoute>
                    <UpdateBlog></UpdateBlog>
                </PrivateRoute>
            },
            {
                path: '/feature-blog',
                element: <FeatureBlog></FeatureBlog>
            },
            {
                path: '/watch-list' , 
                element: <PrivateRoute>
                    <WatchList></WatchList>
                </PrivateRoute>
            }
        ]
    }
])
export default router

