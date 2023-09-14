import Pusher from "pusher-js"

export const pusherClient = new Pusher("APP_KEY", {
    cluster: process.env.PUSHER_CLUSTER!
});
