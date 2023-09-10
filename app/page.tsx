"use client";

import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {title, subtitle, titleWrapper} from "@/components/primitives";
import {useDisclosure} from "@nextui-org/use-disclosure";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {PenSquareIcon, UsersIcon} from "lucide-react";
import {Room} from "@/types";
import {saveLocalGuestId} from "@/store/clientstore";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <section className="flex flex-col justify-center mt-32">
            <div className="items-center">
                <div className={titleWrapper()}>
                    <h1 className={title({size: "lg"})}>Effort Estimation</h1>
                    <div className="flex items-center">
                        <h1 className={title({size: "lg"})}>is now&nbsp;</h1>
                        <h1 className={title({color: "blue", size: "lg"})}>easy.</h1>
                    </div>
                </div>
                <p className={subtitle()}>
                    Set up your planning poker session in seconds with our online app
                    designed for collaborative and playful estimation, making the process
                    enjoyable and efficient.
                </p>
            </div>

            <div className="flex space-x-20 mt-32">
                <Button color={"primary"} size="lg" className="" onPress={onOpen}>
                    Create New Room
                </Button>

                <div className="flex space-x-4">
                    <Input size="sm" label="room pin"/>
                    <Button color={"primary"} size="lg">Join</Button>
                </div>
            </div>

            <CreateRoomModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </section>
    );
}

interface CreateRoomModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const CreateRoomModal = ({isOpen, onOpenChange}: CreateRoomModalProps) => {

    const [roomName, setRoomName] = useState("");
    const [guestName, setGuestName] = useState("");

    const router = useRouter();

    function createRoom(closeModal: () => void) {
        closeModal();

        const requestBody = {
            name: roomName,
            guest: guestName
        };

        fetch("/api/rooms/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to create room!");
                }
                return response.json();
            })
            .then(data => {
                startRoom(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function startRoom(room: Room) {
        console.log("Room", room);
        const localGuest = room.guests.at(0);

        if (!localGuest) throw new Error("INTERNAL ERROR! GUEST NOT AVAILABLE!")

        saveLocalGuestId(localGuest.id);
        router.push("/rooms/" + room.id)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop={"blur"}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create a new room</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <UsersIcon
                                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                }
                                label="Roomname"
                                placeholder="Scrum-Refinement"
                                variant="bordered"
                                required
                                onChange={event => setRoomName(event.target.value)}
                            />
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
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => createRoom(onClose)}>
                                Create Room
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
