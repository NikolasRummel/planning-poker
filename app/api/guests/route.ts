import {addGuestToRoom} from "@/lib/storage/datastore";
import {AddGuestRequest} from "@/types";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const requestData: AddGuestRequest = await request.json()

    const guest = await addGuestToRoom(requestData.roomId, requestData.guestName);

    return NextResponse.json(
        {
            "guest": guest
        }
    );
}
