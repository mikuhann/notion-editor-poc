import {
  $applyNodeReplacement,
  DecoratorNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';
import { ButtonBlockView } from './ButtonBlockView';

export type SerializedButtonBlockNode = Spread<
  {
    label: string;
    href: string;
  },
  SerializedLexicalNode
>;

export class ButtonBlockNode extends DecoratorNode<React.ReactNode> {
  __label: string;
  __href: string;

  static getType(): string {
    return 'button-block';
  }

  static clone(node: ButtonBlockNode): ButtonBlockNode {
    return new ButtonBlockNode(node.__label, node.__href, node.__key);
  }

  constructor(label = 'Button', href = '', key?: NodeKey) {
    super(key);

    this.__label = label;
    this.__href = href;
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedButtonBlockNode): ButtonBlockNode {
    return $createButtonBlockNode(serializedNode.label, serializedNode.href);
  }

  exportJSON(): SerializedButtonBlockNode {
    return {
      ...super.exportJSON(),
      label: this.__label,
      href: this.__href,
      type: 'button-block',
      version: 1,
    };
  }

  decorate(): React.ReactNode {
    return <ButtonBlockView nodeKey={this.__key} label={this.__label} href={this.__href} />;
  }

  setLabel(label: string): void {
    const writable = this.getWritable();
    writable.__label = label;
  }

  setHref(href: string): void {
    const writable = this.getWritable();
    writable.__href = href;
  }
}

export const $createButtonBlockNode = (label = 'Button', href = '') =>
  $applyNodeReplacement(new ButtonBlockNode(label, href));

export const $isButtonBlockNode = (node: unknown): node is ButtonBlockNode =>
  node instanceof ButtonBlockNode;
