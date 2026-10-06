import { useCallback, useEffect, useState } from 'react';
import { Bold, Italic, Strikethrough, Underline, ChevronDown } from 'lucide-react';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';

import { Button, DropdownMenu, DropdownMenuItem, IconButton } from '@/components/ui';
import { LinkPopover } from '../LinkPopover';

type BlockType = 'Text' | 'H1' | 'H2' | 'H3';
type ToolbarPosition = {
  top: number;
  left: number;
};

export const LexicalToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>('Text');
  const [isBlockMenuOpen, setIsBlockMenuOpen] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [linkHref, setLinkHref] = useState<string | undefined>();
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [position, setPosition] = useState<ToolbarPosition | null>(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          setIsBold(false);
          setIsItalic(false);
          setIsUnderline(false);
          setIsStrike(false);
          setIsLink(false);
          setLinkHref(undefined);
          return;
        }

        const anchorNode = selection.anchor.getNode();
        const topLevelElement = anchorNode.getTopLevelElementOrThrow();

        if ($isHeadingNode(topLevelElement)) {
          const tag = topLevelElement.getTag();

          setBlockType(tag === 'h1' ? 'H1' : tag === 'h2' ? 'H2' : 'H3');
        } else {
          setBlockType('Text');
        }

        const linkNode = $isLinkNode(anchorNode) ? anchorNode : anchorNode.getParent();

        if (linkNode && $isLinkNode(linkNode)) {
          setIsLink(true);
          setLinkHref(linkNode.getURL());
        } else {
          setIsLink(false);
          setLinkHref(undefined);
        }

        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrike(selection.hasFormat('strikethrough'));
      });
    });
  }, [editor]);

  const changeBlockType = (type: 'paragraph' | 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection)) {
        return;
      }

      $setBlocksType(selection, () =>
        type === 'paragraph' ? $createParagraphNode() : $createHeadingNode(type),
      );

      const nextSelection = $getSelection();

      if ($isRangeSelection(nextSelection)) {
        nextSelection.anchor.set(
          nextSelection.focus.key,
          nextSelection.focus.offset,
          nextSelection.focus.type,
        );
      }
    });

    setPosition(null);
  };

  const updateToolbarPosition = useCallback(() => {
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      if (!isBlockMenuOpen && !isLinkPopoverOpen) {
        setPosition(null);
      }

      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (!rect.width && !rect.height) {
      return;
    }

    setPosition({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    });
  }, [isBlockMenuOpen, isLinkPopoverOpen]);

  useEffect(() => {
    const handleSelectionChange = () => {
      requestAnimationFrame(updateToolbarPosition);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('resize', handleSelectionChange);
    window.addEventListener('scroll', handleSelectionChange, true);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('resize', handleSelectionChange);
      window.removeEventListener('scroll', handleSelectionChange, true);
    };
  }, [isBlockMenuOpen, isLinkPopoverOpen, updateToolbarPosition]);

  return (
    <>
      {position && (
        <div
          className="fixed z-50 flex -translate-x-1/2 -translate-y-full items-center gap-1 rounded-md border border-neutral-200 bg-white p-1 shadow-md"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <DropdownMenu
            open={isBlockMenuOpen}
            onOpenChange={setIsBlockMenuOpen}
            trigger={
              <Button variant="ghost" size="sm" className="w-20 justify-between">
                {blockType}
                <ChevronDown size={14} />
              </Button>
            }
          >
            <DropdownMenuItem onSelect={() => changeBlockType('paragraph')}>Text</DropdownMenuItem>

            <DropdownMenuItem onSelect={() => changeBlockType('h1')}>Heading 1</DropdownMenuItem>

            <DropdownMenuItem onSelect={() => changeBlockType('h2')}>Heading 2</DropdownMenuItem>

            <DropdownMenuItem onSelect={() => changeBlockType('h3')}>Heading 3</DropdownMenuItem>
          </DropdownMenu>

          <IconButton
            icon={<Bold size={16} />}
            label="Bold"
            aria-pressed={isBold}
            className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
          />

          <IconButton
            icon={<Italic size={16} />}
            label="Italic"
            aria-pressed={isItalic}
            className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
          />

          <IconButton
            icon={<Underline size={16} />}
            label="Underline"
            aria-pressed={isUnderline}
            className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
          />

          <IconButton
            icon={<Strikethrough size={16} />}
            label="Strike"
            aria-pressed={isStrike}
            className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
          />

          <LinkPopover
            open={isLinkPopoverOpen}
            active={isLink}
            initialUrl={linkHref}
            onOpenChange={setIsLinkPopoverOpen}
            onApply={(url) => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            }}
            onRemove={() => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
            }}
          />
        </div>
      )}
    </>
  );
};
