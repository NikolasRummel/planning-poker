import React from 'react';
import RoomNavbar from "@/components/room/navbar";
import {prisma} from "@/lib/prisma";
import CardDeck from "@/components/room/card-deck";

export default async function Page({params}: { params: { id: number } }) {
    const roomId = parseInt(String(params.id), 10);

    if (isNaN(roomId)) {
        return (
            <div>
                <p>Invalid room ID</p>
            </div>
        );
    }

    const room = await prisma.room.findFirst({
        where: {
            id: roomId
        },
        include: {
            Guest: true
        }
    })
    console.log(room)

    return (
        <>
            <div className={"min-h-screen flex flex-col"}>
                <RoomNavbar roomId={roomId}/>
                <br/>
                <span>{JSON.stringify(room)}</span>
                <CardDeck/>
            </div>
        </>
    );
};

