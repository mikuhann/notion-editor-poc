import { useState } from 'react';
import { type Editor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, ChevronDown, Italic, Strikethrough, Underline } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuItem, IconButton } from '@/components/ui';
import { LinkPopover } from '../LinkPopover';

type TiptapToolbarProps = {
  editor: Editor;
};

export const TiptapToolbar = ({ editor }: TiptapToolbarProps) => {
  const [toolbarElement, setToolbarElement] = useState<HTMLDivElement | null>(null);
  const [isBlockMenuOpen, setIsBlockMenuOpen] = useState(false);
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  const changeBlockType = (command: () => void) => {
    command();

    const position = editor.state.selection.to;

    editor.commands.setTextSelection(position);
  };

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
      isUnderline: editor.isActive('underline'),
      isStrike: editor.isActive('strike'),
      isLink: editor.isActive('link'),
      linkHref: editor.getAttributes('link').href as string | undefined,
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
    <BubbleMenu editor={editor} shouldShow={({ from, to }) => isLinkPopoverOpen || from !== to}>
      <div
        ref={setToolbarElement}
        className="flex items-center gap-1 rounded-md border border-neutral-200 bg-white p-1 shadow-sm"
      >
        <DropdownMenu
          open={isBlockMenuOpen}
          onOpenChange={setIsBlockMenuOpen}
          portalContainer={toolbarElement}
          trigger={
            <Button variant="ghost" size="sm" className="w-20 justify-between">
              {editorState.blockType}
              <ChevronDown size={14} />
            </Button>
          }
        >
          <DropdownMenuItem
            onSelect={() =>
              changeBlockType(() => {
                editor.chain().focus().setParagraph().run();
              })
            }
          >
            Text
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() =>
              changeBlockType(() => {
                editor.chain().focus().setHeading({ level: 1 }).run();
              })
            }
          >
            Heading 1
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() =>
              changeBlockType(() => {
                editor.chain().focus().setHeading({ level: 2 }).run();
              })
            }
          >
            Heading 2
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() =>
              changeBlockType(() => {
                editor.chain().focus().setHeading({ level: 3 }).run();
              })
            }
          >
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

        <LinkPopover
          open={isLinkPopoverOpen}
          active={editorState.isLink}
          initialUrl={editorState.linkHref}
          onOpenChange={setIsLinkPopoverOpen}
          onApply={(url) => {
            editor.chain().focus().setLink({ href: url }).run();
          }}
          onRemove={() => {
            editor.chain().focus().unsetLink().run();
          }}
        />
      </div>
    </BubbleMenu>
  );
};
