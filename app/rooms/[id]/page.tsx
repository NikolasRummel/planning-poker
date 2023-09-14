import React from 'react';
import RoomNavbar from "@/components/room/navbar";
import {GuestNameModal} from "@/components/room/guest-name-modal";
import VotingResult from "@/components/room/voting-result";
import RevealButton from "@/components/room/reveal-button";
import {CardDeck} from "@/components/room/card-deck";

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
                <RevealButton/>
                <VotingResult roomId={roomId} />
                <GuestNameModal roomId={roomId} />
                <CardDeck roomId={roomId} />
            </div>
        </>
    );
};

