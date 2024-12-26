import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { format } from "date-fns";
import { Select, Table, TextInput } from "flowbite-react";
import {
  ArrowUpDown,
  DessertIcon,
  Image,
  ListFilter,
  MessageCircle,
  Search,
  User,
  Watch
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("imageURL", {
    cell: (info) => <img className="w-24 h-24 object-cover" src={info.getValue()} alt="" />,
    header: () => (
      <span className="flex items-center">
        <Image className="mr-2" size={16} /> Image
      </span>
    ),
  }),

  columnHelper.accessor("userName", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Name
      </span>
    ),
  }),
  columnHelper.accessor("longDescription", {
    cell: (info) => (
      <span className="italic text-blue-600">{info.getValue().slice(0, 20)}</span>
    ),
    header: () => (
      <span className="flex items-center">
        <DessertIcon className="mr-2" size={16} /> description
      </span>
    ),
  }),
  columnHelper.accessor("category", {
    header: () => (
      <span className="flex items-center">
        <ListFilter className="mr-2" size={16} /> Category
      </span>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("postTime", {
    cell: (info) => <p>{format(new Date(info.getValue()), "P")}</p>,
    header: () => (
      <span className="flex items-center">
        <Watch className="mr-2" size={16} /> Post Tome
      </span>
    ),
  }),
  columnHelper.accessor("comment", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <MessageCircle className="mr-2" size={16} />Comment</span>
    ),
  }),
];

export default function FeatureBlog() {

  const { result } = useLoaderData()
  const [blogs, setBlogs] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");


  // pagination function make
  const [itemPerPage, setItemPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const numberOfPages = Math.ceil(result / itemPerPage)
  const [category , setCategory] = useState('')
  const [search , setSearch] = useState('')

  const pages = [...Array(numberOfPages).keys()];


  const table = useReactTable({
    data: blogs,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    const handleData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_LINK}/all-posts?category=${category}&search=${search}&page=${currentPage}&size=${itemPerPage}`)
      setBlogs(data)
    }
    handleData()
  }, [search, category, itemPerPage, currentPage])

  const handlePage = (data) => {
    setItemPerPage(data)
    setCurrentPage(0)
  }

  return (
    <div className="flex flex-col min-h-screen mx-auto py-5 px-4 sm:px-6 lg:px-8">
      <div className="mb-4 relative">
        <TextInput
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="overflow-x-auto  shadow-md rounded-lg">
        <Table className="min-w-full divide-y divide-gray-200">
          <Table.Body className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Cell
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="ml-2" size={14} />
                    </div>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Body className="">
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    className=""
                  >
                    <Link to={`/blog/${row.original._id}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Link>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm">

        <div className="w-full gap-2 flex flex-wrap justify-center">
          {pages.map(item => <button onClick={() => setCurrentPage(item)} className={currentPage == item ? ' bg-gradient-to-r from-pink-500 to-orange-500 text-white border-white border-2 font-bold w-10 h-10 rounded-full ' : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold w-10 h-10 rounded-full'} key={item}>{item}</button>)}
          <Select onChange={(e) => handlePage(parseInt(e.target.value))} id="countries" required>
            <option selected disabled value='Web Development'>{itemPerPage}</option>
            <option value='2'>2</option>
            <option value='4'>4</option>
            <option value='6'>6</option>
            <option value='8'>8</option>

          </Select>
        </div>
      </div>
    </div>
  );
}
