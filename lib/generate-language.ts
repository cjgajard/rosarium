import * as fs from 'fs';
import * as path from 'path';
import mdjsonTree from './mdjson-tree';

// Below is 草
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const toJSON = (key: string, val: any): any => {
  switch (key) {
  case 'parent':
  case 'level':
  case 'children':
    return void 0;
  case 'verses':
  case 'title':
  case 'text':
    return val;
  default:
  }

  if (typeof val.children !== 'undefined' && !val.children.length)
    return val.text;
  const [title, ...content] = val.children;
  if (!content.length)
    return title.text;
  if (!content[0].children.length)
    return { title: title.text, verses: content };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return content.reduce((memo: any, item: any) => {
    memo[item.text] = item;
    return memo;
  }, {
    title: title.text,
  });
};

export default (lang: string): INodeExt => {
  const filepath = path.join(__dirname, '..', '..', 'text', `${lang}.md`);
  const prayersText = fs.readFileSync(filepath).toString('utf8');
  const tree = mdjsonTree(prayersText);
  return tree;
};
