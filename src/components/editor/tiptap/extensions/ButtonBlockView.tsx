import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

export const ButtonBlockView = ({ node, updateAttributes, selected }: NodeViewProps) => {
  const label = node.attrs.label as string;
  const href = node.attrs.href as string;

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
          placeholder="https://example.com"
          className="rounded border border-neutral-200 px-3 py-2 outline-none"
        />

        <div>
          <a
            href={href || undefined}
            onClick={(event) => {
              if (!href) {
                event.preventDefault();
              }
            }}
            className="inline-flex rounded-md bg-neutral-300 px-4 py-2 text-sm text-neutral-900 no-underline hover:bg-neutral-200"
          >
            {label || 'Button'}
          </a>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
