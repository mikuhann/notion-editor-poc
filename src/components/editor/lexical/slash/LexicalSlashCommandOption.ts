import { MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import type { LexicalEditor } from 'lexical';

type SlashCommand = (editor: LexicalEditor) => void;

export class LexicalSlashCommandOption extends MenuOption {
  title: string;
  keywords: string[];
  command: SlashCommand;

  constructor(title: string, keywords: string[], command: SlashCommand) {
    super(title);

    this.title = title;
    this.keywords = keywords;
    this.command = command;
  }
}
