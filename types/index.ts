export type CreateRoomRequest = {
    name: string,
    guest: string
}

export type AddGuestRequest = {
    guestName: string,
    roomId: number
}

export type SelectCardRequest = {
    guestId: number,
    selectCard: number
}
