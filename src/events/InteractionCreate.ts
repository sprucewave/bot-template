import { Event } from "../client/Event";

export default new Event({
    name: "interactionCreate",
    run: async (client, interaction) => {

        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            command.run({ client, interaction });

        }

        if (interaction.isButton()) {
            client.buttons.get(interaction.customId)?.(interaction);
        }
    }
});