"use client";

import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/public/logo.png"


interface NavbarProps {
    roomId: number;
}
export default function RoomNavbar({roomId}:NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <Link href={"/"}>
                    <Image src={logo} alt={"Logo"} width={"40"}/>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        RoomId: {roomId}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary" href="#" variant="flat">
                        Invite team members
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
