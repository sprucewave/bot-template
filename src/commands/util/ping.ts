import { ApplicationCommandType } from "discord.js";
import { Command } from "../../client/Command";

export default new Command({
    name: "ping",
    description: "Replies with Pong!",
    type: ApplicationCommandType.ChatInput,
    run: async ({ interaction }) => {
        await interaction.reply("Pong!");
    }
});