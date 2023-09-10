// sql storage
import {prisma} from "@/lib/prisma";

export async function createRoom(roomName: string, guestName: string) {
    const room = await prisma.room.create({
        data: {
            name: roomName,
            status: "lobby",
        },
    });

    const guest = await addGuestToRoom(room.id, guestName);
    console.log("Room created: ", JSON.stringify(room));

    return {
        "room": room,
        "guest": guest
    }
}

export async function addGuestToRoom(roomId: number, name: string) {
    return prisma.guest.create({
        data: {
            name: name,
            chosenCard: -1,
            roomId: roomId
        },
    });
}

/*function createRoomId() {
    return Math.floor(Math.random() * 90000) + 10000;
}*/
