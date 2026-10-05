import { type Editor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Strikethrough, Underline } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuItem, IconButton } from '@/components/ui';

type TiptapToolbarProps = {
  editor: Editor;
};

export const TiptapToolbar = ({ editor }: TiptapToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
      isUnderline: editor.isActive('underline'),
      isStrike: editor.isActive('strike'),
      blockType: editor.isActive('heading', { level: 1 })
        ? 'H1'
        : editor.isActive('heading', { level: 2 })
          ? 'H2'
          : editor.isActive('heading', { level: 3 })
            ? 'H3'
            : 'Text',
    }),
  });
  return (
    <BubbleMenu editor={editor}>
      <div className="flex items-center gap-1 rounded-md border border-neutral-200 bg-white p-1 shadow-sm">
        <DropdownMenu
          trigger={
            <Button variant="ghost" size="sm" className="min-w-16">
              {editorState.blockType}
            </Button>
          }
        >
          <DropdownMenuItem onSelect={() => editor.chain().focus().setParagraph().run()}>
            Text
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => editor.chain().focus().setHeading({ level: 1 }).run()}>
            Heading 1
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => editor.chain().focus().setHeading({ level: 2 }).run()}>
            Heading 2
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => editor.chain().focus().setHeading({ level: 3 }).run()}>
            Heading 3
          </DropdownMenuItem>
        </DropdownMenu>

        <IconButton
          icon={<Bold size={16} />}
          label="Bold"
          aria-pressed={editorState.isBold}
          className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <IconButton
          icon={<Italic size={16} />}
          label="Italic"
          aria-pressed={editorState.isItalic}
          className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <IconButton
          icon={<Underline size={16} />}
          label="Underline"
          aria-pressed={editorState.isUnderline}
          className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <IconButton
          icon={<Strikethrough size={16} />}
          label="Strike"
          aria-pressed={editorState.isStrike}
          className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
      </div>
    </BubbleMenu>
  );
};
