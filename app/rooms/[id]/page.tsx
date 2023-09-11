import React from 'react';
import RoomNavbar from "@/components/room/navbar";
import CardDeck from "@/components/room/card-deck";
import {GuestNameModal} from "@/components/room/guest-name-modal";
import VotingResult from "@/components/room/voting-result";

export default async function Page({params}: { params: { id: number } }) {
    const roomId = parseInt(String(params.id), 10);

    if (isNaN(roomId)) {
        return (
            <div>
                <p>Invalid room ID</p>
            </div>
        );
    }

    return (
        <>
            <div className={"min-h-screen flex flex-col"}>
                <RoomNavbar roomId={roomId}/>
                <br/>
                <VotingResult roomId={roomId} />
                <GuestNameModal roomId={roomId} />
                <CardDeck/>
            </div>
        </>
    );
};

