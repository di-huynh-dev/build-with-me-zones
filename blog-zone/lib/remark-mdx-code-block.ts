import { visit } from "unist-util-visit";
import { Transformer } from "unified";
import { Node } from "unist";

interface CodeNode extends Node {
  type: "code";
  lang?: string;
  meta?: string;
  value: string;
}

export function remarkMdxCodeBlock(): Transformer {
  return (tree) => {
    const nodesToRemove: number[] = [];
    
    visit(tree, (node, index, parent) => {
      if (node.type === "code" && (node as CodeNode).lang === "mdx-code-block") {
        // Mark this node for removal - it's just a marker
        if (typeof index === "number" && parent) {
          nodesToRemove.push(index);
        }
      }
    });

    if (nodesToRemove.length > 0) {
      visit(tree, (node: any, index, parent: any) => {
        if (parent && Array.isArray(parent.children)) {
          parent.children = parent.children.filter((_: any, i: number) => !nodesToRemove.includes(i));
        }
      });
    }
  };
}
