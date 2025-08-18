import { Event } from "../client/Event";

export default new Event({
    name: "interactionCreate",
    run: async (client, interaction) => {
        console.log("Debug: Interaction created");
    }
});