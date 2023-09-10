export type Room = {
    id: number,
    name: string,
    status: "lobby" | "running" | "revealed",
    guests: Guest[]
}

export type Guest = {
    id: string,
    name: string,
    chosenCard: number,
    roomId: number
}

export type CreateRoomRequest = {
    name: string,
    guest: string
}
