import { ClientEvents } from "discord.js"
import { ExtendedClient } from "./ExtendedClient";

export type EventType<Key extends keyof ClientEvents> = {
    name: Key,
    run: (client: ExtendedClient, ...args: ClientEvents[Key]) => any
}

export class Event<Key extends keyof ClientEvents>  {
    constructor(props: EventType<Key>) {
        Object.assign(this, props);
    } 
}