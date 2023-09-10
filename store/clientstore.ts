export function saveLocalGuestId(guestId: string) {
    sessionStorage.setItem("guestId", guestId)
}

export function getLocalGuestId() {
    sessionStorage.getItem("guestId");
}
