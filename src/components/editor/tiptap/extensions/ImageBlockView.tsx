import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

export const ImageBlockView = ({ node, updateAttributes, selected }: NodeViewProps) => {
  const src = node.attrs.src as string;
  const alt = node.attrs.alt as string;
  const caption = node.attrs.caption as string;

  return (
    <NodeViewWrapper
      className={`my-3 rounded-lg border p-3 ${
        selected ? 'border-neutral-400' : 'border-neutral-200'
      }`}
      contentEditable={false}
    >
      <div className="flex flex-col gap-2">
        <input
          value={src}
          onChange={(event) => updateAttributes({ src: event.target.value })}
          placeholder="Image URL"
          className="rounded border border-neutral-200 px-3 py-2 outline-none"
        />

        <input
          value={alt}
          onChange={(event) => updateAttributes({ alt: event.target.value })}
          placeholder="Alt text"
          className="rounded border border-neutral-200 px-3 py-2 outline-none"
        />

        {src && <img src={src} alt={alt} className="max-h-96 max-w-full rounded object-contain" />}

        <input
          value={caption}
          onChange={(event) => updateAttributes({ caption: event.target.value })}
          placeholder="Caption"
          className="rounded border border-neutral-200 px-3 py-2 outline-none"
        />
      </div>
    </NodeViewWrapper>
  );
};
