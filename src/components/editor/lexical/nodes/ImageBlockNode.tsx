import {
  $applyNodeReplacement,
  DecoratorNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';

import { ImageBlockView } from './ImageBlockView';

export type SerializedImageBlockNode = Spread<
  {
    src: string;
    alt: string;
    caption: string;
  },
  SerializedLexicalNode
>;

export class ImageBlockNode extends DecoratorNode<React.ReactNode> {
  __src: string;
  __alt: string;
  __caption: string;

  static getType(): string {
    return 'image-block';
  }

  static clone(node: ImageBlockNode): ImageBlockNode {
    return new ImageBlockNode(node.__src, node.__alt, node.__caption, node.__key);
  }

  constructor(src = '', alt = '', caption = '', key?: NodeKey) {
    super(key);

    this.__src = src;
    this.__alt = alt;
    this.__caption = caption;
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedImageBlockNode): ImageBlockNode {
    return $createImageBlockNode(serializedNode.src, serializedNode.alt, serializedNode.caption);
  }

  exportJSON(): SerializedImageBlockNode {
    return {
      ...super.exportJSON(),
      src: this.__src,
      alt: this.__alt,
      caption: this.__caption,
      type: 'image-block',
      version: 1,
    };
  }

  setSrc(src: string): void {
    const writable = this.getWritable();
    writable.__src = src;
  }

  setAlt(alt: string): void {
    const writable = this.getWritable();
    writable.__alt = alt;
  }

  setCaption(caption: string): void {
    const writable = this.getWritable();
    writable.__caption = caption;
  }

  decorate(): React.ReactNode {
    return (
      <ImageBlockView
        nodeKey={this.__key}
        src={this.__src}
        alt={this.__alt}
        caption={this.__caption}
      />
    );
  }
}

export const $createImageBlockNode = (src = '', alt = '', caption = '') =>
  $applyNodeReplacement(new ImageBlockNode(src, alt, caption));

export const $isImageBlockNode = (node: unknown): node is ImageBlockNode =>
  node instanceof ImageBlockNode;
