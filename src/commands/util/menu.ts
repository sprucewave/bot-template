import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, StringSelectMenuBuilder } from "discord.js";
import { Command } from "../../client/Command";

export default new Command({
    name: "menu",
    description: "Menu test",
    type: ApplicationCommandType.ChatInput,
    run: async ({ interaction }) => {

        const rows = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new StringSelectMenuBuilder({
                    customId: "test_menu",
                    placeholder: "Select an option...",
                    options: [
                        {
                            label: "Option 1",
                            value: "option_1"
                        },
                        {
                            label: "Option 2",
                            value: "option_2"
                        }
                    ]
                })
            ]
        });

        interaction.reply({ content: "Please select an option:", components: [rows] });

    },

    menus: new Collection([
        ["test_menu", async (interaction) => {
           await interaction.reply({ content: `You selected: ${interaction.values[0]}` });
        }]
    ])

});