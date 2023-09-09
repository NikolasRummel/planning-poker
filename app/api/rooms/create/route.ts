import {createRoom} from "@/store/datastore";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const requestData = request.body

    console.log(requestData)
    const room = createRoom("Cube", "Nikolas");

    return NextResponse.json(room);
}
