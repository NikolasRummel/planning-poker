import React from 'react';
import RoomNavbar from "@/components/room/navbar";
import {getRoomById} from "@/store/datastore";

export default async function Page({params}: { params: { id: number } }) {

    const room = await getRoomById(params.id);

    return (
        <div>
            <RoomNavbar/>
            <br/>
            <br/>
            <br/>

        </div>
    );
};

