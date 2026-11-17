import { readFileSync } from "node:fs";
import { join } from "node:path";

import { imageSize } from "image-size";

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

// Protocol-relative ("//") and absolute ("https://", "ftp://") URLs.
const REMOTE_URL = /^(?:[a-z]+:)?\/\//i;

function setSize(node: HastNode, dir: string) {
  if (node.type === "element" && node.tagName === "img" && node.properties) {
    const src = node.properties.src;
    if (typeof src === "string" && !REMOTE_URL.test(src)) {
      // "/foo.png" and "foo.png" are both served from `dir`.
      const { width, height } = imageSize(readFileSync(join(dir, src)));
      node.properties.width = width;
      node.properties.height = height;
    }
  }
  node.children?.forEach((child) => setSize(child, dir));
}

/**
 * Rehype plugin that sets `width` and `height` on local `<img>` elements,
 * reading the file from `dir` (the `public` folder). Replaces the
 * unmaintained `rehype-img-size`, which pinned a vulnerable `image-size@1`.
 */
export function rehypeImgSize(options: { dir: string }) {
  return (tree: HastNode) => setSize(tree, options.dir);
}
