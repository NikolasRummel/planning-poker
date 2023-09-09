export type Room = {
    id: number,
    name: string,
    status: "lobby" | "running" | "revealed",
    guests: Guest[]
}

export type Guest = {
    id: number,
    name: string,
    chosenCard: number,
    roomId: number
}

