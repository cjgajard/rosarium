import fs from 'fs';
import mdjsonTree from '../mdjson-tree';
import path from 'path';

export default (lang: Lang): INodeExt => {
  const root = path.join(process.cwd());
  const filepath = path.join(root, 'text', `${lang}.md`);
  const prayersText = fs.readFileSync(filepath).toString('utf8');
  const tree = mdjsonTree(prayersText);
  return tree;
};
