import marked from 'marked';

const isDef = (obj: marked.Token): obj is marked.Tokens.Def => (
  'raw' in obj && 'href' in obj && 'title' in obj
);

export default (text: string): INodeExt => {
  const tokens = marked.lexer(text);
  let current: INodeExt = { children: [], level: 0, text: '' };
  tokens.forEach((token) => {
    if (isDef(token))
      return;
    switch (token.type) {
    case 'space':
      break;
    case 'heading':
      if (token.depth > current.level) {
        const newNode = {
          children: [],
          level: token.depth,
          parent: current,
          text: token.text,
        };
        current.children.push(newNode);
        current = newNode;
      }
      else if (token.depth === current.level) {
        const newNode = {
          children: [],
          level: token.depth,
          parent: current.parent,
          text: token.text,
        };
        if (current.parent)
          current.parent.children.push(newNode);
        current = newNode;
      }
      else {
        while (current.parent && token.depth <= current.level)
          current = current.parent;
        const newNode = {
          children: [],
          level: token.depth,
          parent: current,
          text: token.text,
        };
        current.children.push(newNode);
        current = newNode;
      }
      break;
    case 'paragraph':
      current.children.push({
        children: [],
        level: current.level + 1,
        parent: current,
        text: token.text,
      });
      break;
    default:
      if (token.type as string === 'list') {
        const tok = token as marked.Tokens.List;
        const arr = tok.items.map(it => ({
          children: [],
          level: current.level + 1,
          parent: current,
          text: it.text.trim(),
        }));
        current.children.push(...arr);
      }
      break;
    }
  });
  while (current.parent)
    current = current.parent;
  return current;
};
