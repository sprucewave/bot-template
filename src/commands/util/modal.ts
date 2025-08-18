import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Collection, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Command } from "../../client/Command";

export default new Command({
    name: "modal",
    description: "Modal test",
    type: ApplicationCommandType.ChatInput,
    run: async ({ interaction }) => {

        const modal = new ModalBuilder()
            .setCustomId("test_modal")
            .setTitle("Test Modal")

        const input = new ActionRowBuilder<TextInputBuilder>({
            components: [
                new TextInputBuilder({
                    customId: "test_modal",
                    label: "Enter something...",
                    placeholder: "Type here...",
                    style: TextInputStyle.Short
                })
            ]
        });

        modal.setComponents([input]);
        interaction.showModal(modal)

    },
    modals: new Collection([
        ["test_modal", (interaction) => {
            interaction.reply({ content: "You submitted the modal!", flags: ["Ephemeral"] });
        }]
    ])
});