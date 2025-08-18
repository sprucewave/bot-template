import { BitFieldResolvable, ButtonInteraction, Client, ClientEvents, Collection, GatewayIntentsString, IntentsBitField, Partials } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { EventType } from "./Event";
import { CommandType } from "./Command";

dotenv.config();

export class ExtendedClient extends Client {

    commands: Collection<string, CommandType> = new Collection();
    buttons: Collection<string, (interaction: ButtonInteraction) => any> = new Collection();

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

        this.registerCommands();
        this.registerEvents();

        this.login(process.env.client_token);
        console.log("[!] Bot is online");

    }

    private registerCommands() {

        const commandList: CommandType[] = [];

        fs.readdirSync(path.join(__dirname, "../commands")).forEach(file => {

            const commandPath = path.join(__dirname, "../commands", file);
            const commandFilter = (commandName: string) => commandName.endsWith(".ts") || commandName.endsWith(".js");

            fs.readdirSync(commandPath).filter(commandFilter).forEach(async commandFile => {

                const command: CommandType = require(path.join(commandPath, commandFile))?.default;

                this.commands.set(command.name, command);
                commandList.push(command);

                if (command.buttons) command.buttons.forEach((handler, id) => { this.buttons.set(id, handler); });

            });

        });

        this.on("ready", () => {
            this.application?.commands.set(commandList)
                .then(() => console.log("[!] Commands registered successfully"))
                .catch(console.error);
        });

    }

    private registerEvents() {

        const eventsPath = path.join(__dirname, "../events");
        const eventFilter = (eventName: string) => eventName.endsWith(".ts") || eventName.endsWith(".js");

        fs.readdirSync(eventsPath).filter(eventFilter).forEach(async file => {

            let { name, run }: EventType<keyof ClientEvents> = require(path.join(eventsPath, file))?.default;
            try {
                this.on(name, run.bind(null, this));
            } catch {
                console.log(`[!] Failed to register event: ${name}`);
            }

        });

    }

}
