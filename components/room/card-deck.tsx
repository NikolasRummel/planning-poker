"use client";

import React, {useState} from 'react';
import {getLocalGuestId} from "@/lib/storage/clientstore";
import {SelectCardRequest} from "@/types";

const CardDeck = () => {
    const cards = [
        {value: 0, color: 'bg-red-500'},
        {value: 1, color: 'bg-blue-500'},
        {value: 2, color: 'bg-green-500'},
        {value: 3, color: 'bg-yellow-500'},
        {value: 5, color: 'bg-pink-500'},
        {value: 8, color: 'bg-indigo-500'},
        {value: 13, color: 'bg-purple-500'},
        {value: 21, color: 'bg-orange-500'},
        {value: 34, color: 'bg-teal-500'},
    ];

    const [selectedCard, setSelectedCard] = useState<number>(-1);

    const handleCardClick = (cardValue: number) => {
        setSelectedCard(cardValue);

        console.log("CardVALUZE: " + cardValue)

        if(getLocalGuestId() == "-1") throw new Error("Local guest id not found")

        const requestBody: SelectCardRequest = {
            guestId: parseInt(getLocalGuestId()),
            selectCard: cardValue
        }

        fetch("/api/guests/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to save selected card!");
                }
                return response.json();
            })
            .then(guest => {
                console.log(JSON.stringify(guest))

            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="mt-auto mb-28">
            <div className="flex justify-center mb-12">
                <h2>choose your card</h2>
            </div>
            <div className="flex justify-center">
                <div className="md:flex md:space-x-4">
                    {cards.map((card) => (
                        <div
                            key={card.value}
                            className={`w-32 h-44 text-white rounded-lg p-4 cursor-pointer transform transition-transform ${card.color} flex justify-center items-center shadow-2xl ${
                                selectedCard === card.value
                                    ? 'scale-105 -translate-y-8 border-2 border-white'
                                    : 'hover:scale-105 hover:-translate-y-2'
                            }`}
                            onClick={() => handleCardClick(card.value)}
                        >
                            {card.value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default CardDeck;
