import React from 'react';
import {prisma} from "@/lib/prisma";

const VotingResult = async ({roomId}: { roomId: number }) => {

    const guests = await prisma.guest.findMany({
        where: {
            roomId: roomId
        },
    })


    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {guests.map((guest, index) => (
                    <div
                        key={index}
                        className="p-12 rounded-2xl text-center shadow-lg border border-gray-200"
                    >
                        <p className="text-5xl font-semibold mb-4">{guest.name}</p>
                        <p className="text-3xl font-semibold text-gray-900">{guest.chosenCard == -1 ? "not voted yet" : guest.chosenCard}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotingResult;
