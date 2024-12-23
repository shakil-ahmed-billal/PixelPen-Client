
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";



const WatchList = () => {

    const {user} = useAuth()
    const [data , setData] = useState([])

    useEffect(()=>{
        
        handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

    const handleData = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_LINK}/watch-list/${user.email}`)
        console.log(data)
        setData(data)
    }

    const handleDelete = async(id) =>{
        const {data} = await axios.delete(`${import.meta.env.VITE_LINK}/watch-list/${id}`)
        console.log(data)
        console.log(id)
        if(data.deletedCount){
            handleData()
        }
    }
  return (
    <div>
      <div className="overflow-x-auto mt-10">
      <Table >
        <TableHead>
          <TableHeadCell>Product name</TableHeadCell>
          <TableHeadCell>Color</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data&& data?.map(item =><TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="">
              <img className="w-20 object-cover " src={item.imageURL} alt="" />
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.title.slice(0 ,30)}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>
                <div className="flex flex-col justify-center items-center">
                    <p>Author: {item.userName}</p>
                    <img className="w-12 h-12 rounded-full" src={item.userPhoto} alt="" />
                </div>
            </TableCell>
            <TableCell className="flex gap-2">
              <Link to={`/blog/${item.blogId}`}><Button>Details</Button></Link>
              <Button onClick={()=>handleDelete(item._id)}>Delete</Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}

export default WatchList
