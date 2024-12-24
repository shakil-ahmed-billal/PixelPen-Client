
import {
    Avatar,
    Button,
    DarkThemeToggle,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";

import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/log.jpg';
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";



export function Header() {

    const {user , LogOutUser} = useContext(AuthContext)
    console.log(user)


    const handleLogOut = () =>{
        LogOutUser()
    }

    return (
        <div className="">
            <Navbar fluid rounded className="py-2 rounded-none">
            <NavbarBrand >
                <Link to={'/'}><img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /></Link>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PixelPen <span className=" font-bold text-rose-500">.</span></span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <DarkThemeToggle className="rounded-full w-10 h-10 flex justify-center my-auto mx-auto mr-3" />
                {user? <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <img referrerPolicy="no-referrer" className="w-12 h-12 rounded-full" src={user.photoURL}></img>
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">{user.displayName}</span>
                        <span className="block truncate text-sm font-medium">{user.email}</span>
                    </DropdownHeader>
                    <Link to={'/dashboard'}><DropdownItem>Dashboard</DropdownItem></Link>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={handleLogOut}>Sign out</DropdownItem>
                </Dropdown>: <Link to={'/login'}><Button>Login</Button></Link>}
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavbarLink><NavLink to={'/'}>Home</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/add-blog'}>Add Blog</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/all-blogs'}>All Blogs</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/watch-list'}>WatchList</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/feature-blog'}>Feature Blog</NavLink></NavbarLink>

                {/* <NavbarLink href="#"></NavbarLink> */}
            </NavbarCollapse>
        </Navbar>
        </div>
    );
}
