import { visit } from "unist-util-visit";
import { Transformer } from "unified";
import { Node } from "unist";

interface DirectiveNode extends Node {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  attributes: Record<string, string>;
  children: Node[];
  data?: {
    hName?: string;
    hProperties?: Record<string, string>;
  };
}

export function remarkAdmonition(): Transformer {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const n = node as DirectiveNode;
        if (
          ["note", "tip", "info", "warning", "danger"].includes(n.name)
        ) {
          const data = n.data || (n.data = {});
          data.hName = "Admonition";
          data.hProperties = {
            type: n.name,
            title: n.attributes.title,
          };
        }
      }
    });
  };
}
