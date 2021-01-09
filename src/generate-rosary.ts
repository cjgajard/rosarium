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
    return void 0;
  case 'children':
    return (val.length > 0) ? val : void 0;
  case 'text':
    return val;
  default:
    if (typeof val.children !== 'undefined' && !val.children?.length)
      return val.text;
    return val;
  }
};

export default (lang: string): INode => {
  const filepath = path.join(__dirname, '..', 'text', `${lang}.md`);
  const prayersText = fs.readFileSync(filepath).toString('utf8');
  const tree = mdjsonTree(prayersText);
  return tree;
};
