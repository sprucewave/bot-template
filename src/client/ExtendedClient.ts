import { BitFieldResolvable, Client, ClientEvents, GatewayIntentsString, IntentsBitField, Partials } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { EventType } from "./Event";

dotenv.config();

export class ExtendedClient extends Client {

    constructor() {
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent,
                Partials.Message, Partials.Reaction, Partials.User, Partials.ThreadMember
            ]
        });

    }

    public start() {
        
        this.registerEvents();

        this.login(process.env.client_token);
        console.log("[!] Bot is online");

    }

    private registerEvents() {

        const eventsPath = path.join(__dirname, "../events");
        const eventFilter = (eventName: string) => eventName.endsWith(".ts") || eventName.endsWith(".js");

        fs.readdirSync(eventsPath).filter(eventFilter).forEach( async file => {
           
            let { name, run }: EventType<keyof ClientEvents> = require(path.join(eventsPath, file))?.default;
            try {
                this.on(name, run.bind(null, this));
            } catch {
                console.log(`[!] Failed to register event: ${name}`);
            }

        });

    }

}
