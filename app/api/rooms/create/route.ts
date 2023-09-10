import {createRoom} from "@/lib/storage/datastore";
import {NextResponse} from "next/server";
import {CreateRoomRequest} from "@/types";

export async function POST(request: Request) {
    const requestData: CreateRoomRequest = await request.json()

    const roomWithCreator = await createRoom(requestData.name, requestData.guest)

    return NextResponse.json(
        {
            "roomId": roomWithCreator.room.id,
            "guestId": roomWithCreator.guest.id
        }
    );
}
