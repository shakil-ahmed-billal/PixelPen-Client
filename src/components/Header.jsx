
import {
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
    NavbarToggle
} from "flowbite-react";

import { useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/log.jpg';
import { AuthContext } from "../provider/AuthProvider";



export function Header() {

    const { user, LogOutUser } = useContext(AuthContext)

    const scrollToSection = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1); const targetElement = document.getElementById(targetId);
        window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
    };

    const handleLogOut = () => {
        LogOutUser()
    }

    return (
        <div className="dark:bg-[#1F2937] fixed top-0 w-full z-50">
            <Navbar fluid rounded className="rounded-none  md:mx-24">
                <NavbarBrand >
                    <Link to={'/'}><img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /></Link>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PixelPen <span className=" font-bold text-rose-500">.</span></span>
                </NavbarBrand>
                <div className="flex md:order-2">
                    <DarkThemeToggle className="rounded-full w-10 h-10 flex justify-center my-auto mx-auto mr-3" />
                    {user ? <Dropdown
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
                    </Dropdown> : <Link to={'/login'}><Button>Login</Button></Link>}
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink><NavLink to={'/'}>Home</NavLink></NavbarLink>
                    {user&&<NavbarLink><NavLink to={'/add-blog'}>Add Blog</NavLink></NavbarLink>}
                    <NavbarLink><NavLink to={'/all-blogs'}>All Blogs</NavLink></NavbarLink>
                    {user &&<NavbarLink><NavLink to={'/watch-list'}>WishList</NavLink></NavbarLink>}
                    <NavbarLink><NavLink to={'/feature-blog'}>Feature Blog</NavLink></NavbarLink>
                    <NavbarLink><a href="#promotion" onClick={scrollToSection}>Promotion</a></NavbarLink>
                    <NavbarLink ><NavLink to={'/about'}>About</NavLink></NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}
