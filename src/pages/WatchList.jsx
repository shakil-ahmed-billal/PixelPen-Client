
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";



const WatchList = () => {

  const { user } = useAuth()
  const [data, setData] = useState([])

  useEffect(() => {

    handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_LINK}/watch-list/${user.email}`, { withCredentials: true })
    console.log(data)
    setData(data)
  }

  const handleDelete = async (id) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`} >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Are you sure this WatchList for Delete
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center border-l border-gray-200">
          <div className="">
          <button
            onClick={async() => {
              const { data } = await axios.delete(`${import.meta.env.VITE_LINK}/watch-list/${id}`)
              console.log(data)

              console.log(id)
              if (data.deletedCount) {
                handleData()
              }
              toast.dismiss(t.id)
            }}
            className="btn-custom" >
            Delete
          </button>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" >
            Close
          </button>
        </div>
      </div>
    ))
  }
  return (
    <div>
      <div className="overflow-x-auto mt-10">
        <Table >
          <TableHead>
            <TableHeadCell>Blog Image</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Add Time</TableHeadCell>
            <TableHeadCell>Author</TableHeadCell>
            <TableHeadCell>Read or Delete</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data && data?.map(item => <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="">
                <img className="w-20 h-10 object-cover " src={item.imageURL} alt="" />
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.title.slice(0, 20)}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <p>{format(new Date(item.watchTime), "P")}</p>
              </TableCell>
              <TableCell>
                <div className="flex flex-col justify-center items-center">
                  <img className="w-12 h-12 rounded-full" src={item.userPhoto} alt="" />
                </div>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Link to={`/blog/${item.blogId}`}><Button>Details</Button></Link>
                <button className="btn-custom" onClick={() => handleDelete(item._id)}>Delete</button>
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WatchList
