import {createRoom} from "@/store/datastore";
import {NextResponse} from "next/server";
import {CreateRoomRequest} from "@/types";

export async function POST(request: Request) {
    const requestData: CreateRoomRequest = await request.json()
    const room = createRoom(requestData.name, requestData.guest);

    return NextResponse.json(room);
}
