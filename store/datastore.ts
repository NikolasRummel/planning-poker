// In-memory data store
import {Guest, Room} from "@/types";
import {randomUUID} from "crypto";

export const rooms: Map<number, Room> = new Map();

export function createRoom(roomName: string, guestName: string): Room {
    let room: Room = {
        id: createRoomId(),
        name: roomName,
        guests: [],
        status: "lobby",
    }
    rooms.set(room.id, room);

    addGuestToRoom(room.id, guestName);

    console.log("Room created: ", JSON.stringify(room));
    return room;
}

export function addGuestToRoom(roomId: number, name: string): Guest | null {
    const room = rooms.get(roomId);

    // check if room exists
    if (!room) {
        return null;
    }

    // check if guest exists
    const guestExits = room.guests.some(guest => guest.name === name)

    if (guestExits) {
        throw new Error("guest already in room");
    }

    const guest: Guest = {
        id: randomUUID(),
        name,
        roomId,
        chosenCard: -1,
    }

    room.guests.push(guest);
    return guest;
}


export function getRoomById(roomId: number): Room | undefined {
    console.log("getRoomById1", roomId)
    rooms.forEach((value, key) => {
        console.log(key, value);
    })
    console.log("getRoomById2", roomId)
    return rooms.get(roomId);
}

// returns random 5-digit id
function createRoomId() {
    return Math.floor(Math.random() * 90000) + 10000;
}
