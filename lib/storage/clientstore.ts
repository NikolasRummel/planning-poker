export function saveLocalGuestId(guestId: string) {
    sessionStorage.setItem("guestId", guestId)
}

export function getLocalGuestId() {
    return sessionStorage.getItem("guestId") || null;
}
