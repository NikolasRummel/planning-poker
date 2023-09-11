// sql storage
import {prisma} from "@/lib/prisma";

export async function createRoom(roomName: string, guestName: string) {
    // delete inactive rooms
    // maybe add a scheduler for this logic
    await deleteInactiveRooms()


    // create a new room
    const room = await prisma.room.create({
        data: {
            name: roomName,
            status: "lobby",
        },
    });

    // create a new guest and add it to the room
    const guest = await addGuestToRoom(room.id, guestName);
    console.log("Room created: ", JSON.stringify(room));

    // return room and guest
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

async function deleteInactiveRooms() {
    const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h

    try {
        // Find and delete inactive rooms
        const inactiveRooms = await prisma.room.findMany({
            where: {
                updatedAt: {lte: threshold},
            },
        });

        for (const room of inactiveRooms) {
            // Delete associated guests first
            await prisma.guest.deleteMany({
                where: {
                    roomId: room.id,
                },
            });

            // Then, delete the room
            await prisma.room.delete({
                where: {
                    id: room.id,
                },
            });

            console.log(`Deleted room ${room.name} and associated guests.`);
        }
    } catch (error) {
        console.error('Error deleting inactive rooms:', error);
    } finally {
        await prisma.$disconnect();
    }
}


/*function createRoomId() {
    return Math.floor(Math.random() * 90000) + 10000;
}*/
