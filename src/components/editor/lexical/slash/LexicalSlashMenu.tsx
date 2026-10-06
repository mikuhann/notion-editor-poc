import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { $createParagraphNode, $getSelection, $isRangeSelection, type TextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';

import { LexicalSlashCommandOption } from './LexicalSlashCommandOption';

export const LexicalSlashMenu = () => {
  const [editor] = useLexicalComposerContext();
  const [query, setQuery] = useState<string | null>(null);

  const triggerFn = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
    allowWhitespace: true,
  });

  const options = useMemo(
    () => [
      new LexicalSlashCommandOption('Text', ['paragraph', 'text'], () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      }),

      new LexicalSlashCommandOption('Heading 1', ['h1', 'heading'], () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h1'));
        }
      }),

      new LexicalSlashCommandOption('Heading 2', ['h2', 'heading'], () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h2'));
        }
      }),

      new LexicalSlashCommandOption('Heading 3', ['h3', 'heading'], () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h3'));
        }
      }),

      new LexicalSlashCommandOption('Bullet list', ['bullet', 'ul', 'list'], (editor) => {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }),

      new LexicalSlashCommandOption(
        'Ordered list',
        ['ordered', 'ol', 'numbered', 'list'],
        (editor) => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        },
      ),

      new LexicalSlashCommandOption('Quote', ['quote', 'blockquote'], () => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      }),
    ],
    [],
  );

  const filteredOptions = useMemo(() => {
    const search = query?.toLowerCase().trim() ?? '';

    if (!search) {
      return options;
    }

    return options.filter(
      (option) =>
        option.title.toLowerCase().includes(search) ||
        option.keywords.some((keyword) => keyword.includes(search)),
    );
  }, [options, query]);

  const onSelectOption = useCallback(
    (option: LexicalSlashCommandOption, nodeToRemove: TextNode | null, closeMenu: () => void) => {
      editor.update(() => {
        nodeToRemove?.remove();
        option.command(editor);
        closeMenu();
      });
    },
    [editor],
  );

  return (
    <LexicalTypeaheadMenuPlugin<LexicalSlashCommandOption>
      triggerFn={triggerFn}
      onQueryChange={setQuery}
      onSelectOption={onSelectOption}
      options={filteredOptions}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) =>
        anchorElementRef.current
          ? createPortal(
              <div className="w-56 rounded-md border border-neutral-200 bg-white p-1 shadow-md">
                {filteredOptions.length ? (
                  filteredOptions.map((option, index) => (
                    <button
                      key={option.key}
                      ref={option.setRefElement}
                      type="button"
                      className={`flex w-full rounded px-2 py-1.5 text-left text-sm ${
                        selectedIndex === index ? 'bg-neutral-100' : 'hover:bg-neutral-100'
                      }`}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => {
                        setHighlightedIndex(index);
                        selectOptionAndCleanUp(option);
                      }}
                    >
                      {option.title}
                    </button>
                  ))
                ) : (
                  <div className="px-2 py-1.5 text-sm text-neutral-500">No results</div>
                )}
              </div>,
              anchorElementRef.current,
            )
          : null
      }
    />
  );
};
