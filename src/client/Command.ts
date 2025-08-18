import { ExtendedClient } from "./ExtendedClient";

import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  UserContextMenuCommandInteraction,
  MessageContextMenuCommandInteraction,
  PrimaryEntryPointCommandInteraction,
  ApplicationCommandData,
  Collection,
  ButtonInteraction,
  StringSelectMenuInteraction,
  ModalSubmitInteraction,
} from "discord.js";

type InteractionTypeMap = {
  [ApplicationCommandType.ChatInput]: ChatInputCommandInteraction;
  [ApplicationCommandType.User]: UserContextMenuCommandInteraction;
  [ApplicationCommandType.Message]: MessageContextMenuCommandInteraction;
  [ApplicationCommandType.PrimaryEntryPoint]: PrimaryEntryPointCommandInteraction;
};

export interface ICommandProperties<T extends ApplicationCommandType = ApplicationCommandType> {
  client: ExtendedClient;
  interaction: InteractionTypeMap[T];
}

export interface CommandComponents {
  buttons?: Collection<string, (interaction: ButtonInteraction) => any>
  menus?: Collection<string, (interaction: StringSelectMenuInteraction) => any>
  modals?: Collection<string, (interaction: ModalSubmitInteraction) => any>;
}

export type CommandType<T extends ApplicationCommandType = ApplicationCommandType> = ApplicationCommandData & CommandComponents & {
  type: T;
  run: (props: ICommandProperties<T>) => any;
};

export class Command<T extends ApplicationCommandType = ApplicationCommandType> {
  constructor(props: CommandType<T>) {
    Object.assign(this, props);
  }
}