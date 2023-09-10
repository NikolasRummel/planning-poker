import React from 'react';
import RoomNavbar from "@/components/room/navbar";
import {prisma} from "@/lib/prisma";

export default async function Page({params}: { params: { id: number } }) {

    const room = await prisma.room.findFirst({
        where: {
            id: 6
        },
        include: {
            Guest: true
        }
    })
    console.log(room)

    return (
        <div>
            <RoomNavbar/>
            <br/>
            <br/>
            <br/>
            <span>{JSON.stringify(room)}</span>
        </div>
    );
};

