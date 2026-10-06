import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, type NodeKey } from 'lexical';

import { $isImageBlockNode } from './ImageBlockNode';

type ImageBlockViewProps = {
  nodeKey: NodeKey;
  src: string;
  alt: string;
  caption: string;
};

export const ImageBlockView = ({ nodeKey, src, alt, caption }: ImageBlockViewProps) => {
  const [editor] = useLexicalComposerContext();

  const updateAttributes = (attributes: { src?: string; alt?: string; caption?: string }) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);

      if (!$isImageBlockNode(node)) {
        return;
      }

      if (attributes.src !== undefined) {
        node.setSrc(attributes.src);
      }

      if (attributes.alt !== undefined) {
        node.setAlt(attributes.alt);
      }

      if (attributes.caption !== undefined) {
        node.setCaption(attributes.caption);
      }
    });
  };

  return (
    <div className="my-3 rounded-lg border border-neutral-200 p-3">
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
    </div>
  );
};
