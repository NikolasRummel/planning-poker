import {SelectCardRequest} from "@/types";
import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {pusherServer} from "@/lib/pusher/pusher-server";

export async function POST(request: Request) {
    const requestData: SelectCardRequest = await request.json()

    const updatedGuest = await prisma.guest.update({
        where: {
            id: requestData.guestId
        },
        data: {
            chosenCard: requestData.selectCard
        }
    })

    console.log(updatedGuest)
    await pusherServer.trigger("room-" + requestData.roomId, "update-card", {message: "hello nele!"});

    return NextResponse.json(updatedGuest);
}
