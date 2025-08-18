import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection } from "discord.js";
import { Command } from "../../client/Command";

export default new Command({
    name: "button",
    description: "Button test",
    type: ApplicationCommandType.ChatInput,
    run: async ({ interaction }) => {

        const rows = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    customId: "test_button",
                    label: "Click me",
                    style: ButtonStyle.Primary
                })
            ]
        });

        await interaction.reply({ content: "Pong!", components: [rows] });
    },

    buttons: new Collection([
        ["test_button", async (interaction) => {
            await interaction.reply({ content: "Button clicked!" });
        }]
    ])

});