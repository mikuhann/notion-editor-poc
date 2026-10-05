import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

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

export const ButtonBlockView = ({ node, updateAttributes, selected, editor }: NodeViewProps) => {
  const label = node.attrs.label as string;
  const href = node.attrs.href as string;
  const isEditable = editor.isEditable;

  if (!isEditable) {
    return (
      <NodeViewWrapper className="my-3" contentEditable={false}>
        <a
          href={href}
          className="inline-flex rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
        >
          {label || 'Button'}
        </a>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      className={`my-3 rounded-lg border p-3 ${
        selected ? 'border-neutral-400' : 'border-neutral-200'
      }`}
      contentEditable={false}
    >
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
          <div>
            <span className="inline-flex cursor-default rounded-md bg-neutral-300 px-4 py-2 text-sm text-neutral-900">
              {label || 'Button'}
            </span>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
