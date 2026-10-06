import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, type NodeKey } from 'lexical';

import { $isButtonBlockNode } from './ButtonBlockNode';

type ButtonBlockViewProps = {
  nodeKey: NodeKey;
  label: string;
  href: string;
};

const normalizeHref = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const buttonClassName = 'inline-flex rounded-md bg-neutral-300 px-4 py-2 text-sm text-neutral-900';

export const ButtonBlockView = ({ nodeKey, label, href }: ButtonBlockViewProps) => {
  const [editor] = useLexicalComposerContext();

  const updateAttributes = (attributes: { label?: string; href?: string }) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);

      if (!$isButtonBlockNode(node)) {
        return;
      }

      if (attributes.label !== undefined) {
        node.setLabel(attributes.label);
      }

      if (attributes.href !== undefined) {
        node.setHref(attributes.href);
      }
    });
  };

  return (
    <div className="my-3 rounded-lg border border-neutral-200 p-3">
      <div className="flex flex-col gap-2">
        <input
          value={label}
          onChange={(event) => updateAttributes({ label: event.target.value })}
          placeholder="Button label"
          className="rounded border border-neutral-200 px-3 py-2 outline-none"
        />

        <input
          value={href}
          onChange={(event) => updateAttributes({ href: event.target.value })}
          onBlur={() => {
            const normalizedHref = normalizeHref(href);

            if (normalizedHref !== href) {
              updateAttributes({ href: normalizedHref });
            }
          }}
          placeholder="https://example.com"
          className="rounded border border-neutral-200 px-3 py-2 outline-none"
        />

        <div>
          <span className={buttonClassName}>{label || 'Button'}</span>
        </div>
      </div>
    </div>
  );
};
