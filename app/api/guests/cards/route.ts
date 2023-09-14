import {SelectCardRequest} from "@/types";
import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

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

    return NextResponse.json(updatedGuest);
}
