
import {
    Avatar,
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



export function Header() {


    return (
        <Navbar fluid rounded className="py-2 rounded-none">
            <NavbarBrand >
                <Link to={'/'}><img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /></Link>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PixelPen</span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <DarkThemeToggle className="rounded-full mr-3" />
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </DropdownHeader>
                    <Link to={'/dashboard'}><DropdownItem>Dashboard</DropdownItem></Link>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavbarLink><NavLink to={'/'}>Home</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/'}>Add Blog</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/'}>All Blogs</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/'}>WatchList</NavLink></NavbarLink>
                <NavbarLink><NavLink to={'/'}>Feature Blog</NavLink></NavbarLink>

                {/* <NavbarLink href="#"></NavbarLink> */}
            </NavbarCollapse>
        </Navbar>
    );
}
