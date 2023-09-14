export function saveLocalGuestId(guestId: string) {
    sessionStorage.setItem("guestId", guestId)
}

export function getLocalGuestId() : string {
    return sessionStorage.getItem("guestId") || "-1";
}
