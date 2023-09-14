"use client";

import React, {useEffect, useState} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {Input} from "@nextui-org/input";
import {PenSquareIcon} from "lucide-react";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/react";
import {getLocalGuestId, saveLocalGuestId} from "@/lib/storage/clientstore";
import {AddGuestRequest} from "@/types";

export const GuestNameModal = ({roomId}: { roomId: number }) => {

    const [guestName, setGuestName] = useState("");
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        // Check if guestId is in storage
        const guestId = getLocalGuestId();

        console.log(guestId)
        console.log(guestId)
        console.log(guestId)
        console.log(guestId)

        if (guestId != "-1") return; // user already "authenticated"

        setOpen(true);

    }, []);


    async function createGuest() {
        setOpen(false);

        const requestBody: AddGuestRequest = {
            guestName: guestName,
            roomId: roomId
        };

        fetch("/api/guests/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add guest!");
                }
                return response.json();
            })
            .then(data => {
                saveLocalGuestId(data.guest.id);
                console.log(JSON.stringify(data))

            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Modal isOpen={isOpen} placement="center" backdrop={"blur"}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Please enter your name to join the room
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                endContent={
                                    <PenSquareIcon
                                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                }
                                label="Your Name"
                                placeholder="Max Mustermann"
                                variant="bordered"
                                required
                                onChange={event => setGuestName(event.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Link href={"/"}>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                            </Link>
                            <Button color="primary" onPress={() => createGuest()}>
                                Join Room
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

