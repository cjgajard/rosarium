import generateRosary, { toJSON } from './generate-language';
import { toLanguage } from './generate-rosary';

const lang = toLanguage(process.argv[2]);
if (!lang)
  process.exit(1);

// eslint-disable-next-line no-magic-numbers
const content = JSON.stringify(generateRosary(lang), toJSON, 2);
process.stdout.write(`${content}\n`);

// const json = JSON.stringify(tree, toJSON);
// const content = JSON.parse(json);
// return content;
