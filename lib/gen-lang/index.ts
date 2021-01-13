import generator from './generator';
import { isLang } from '../lang';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toJSON = (key: string, val: any): any => {
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

const code = process.argv[2];
if (isLang(code)) {
  const content = JSON.stringify(generator(code), toJSON, 2);
  process.stdout.write(`${content}\n`);
}
else {
  process.stderr.write(`Unexpected code '${code}'.\n`);
  process.exit(1);
}
