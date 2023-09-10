"use client";

import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/public/logo.png"
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {useDisclosure} from "@nextui-org/use-disclosure";
import {ClipboardCopy} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {Input} from "@nextui-org/input";

interface NavbarProps {
    roomId: number;
}

export default function RoomNavbar({roomId}: NavbarProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleCopyLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        navigator.clipboard.writeText(`http://localhost:3000/rooms/${roomId}`);
    }

    return (
        <Navbar>
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
                    <Button color="primary" href="#" variant="flat" onPress={onOpen}>
                        Invite team members
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Room Link</ModalHeader>
                            <ModalBody>

                                <Popover placement="right">
                                    <div className={"flex space-x-2"}>
                                        <Input disabled placeholder={`http://localhost:3000/rooms/${roomId}`}/>
                                        <PopoverTrigger>
                                            <Link color="foreground" onClick={event => handleCopyLink(event)}>
                                                <ClipboardCopy className={"hover:text-blue-700"}/>
                                            </Link>
                                        </PopoverTrigger>
                                    </div>
                                    <PopoverContent>
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">Link copied!</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Navbar>
    );
}
