import generateRosary, { toJSON as rosaryToJSON } from './generate-rosary';

// eslint-disable-next-line no-magic-numbers
const content = JSON.stringify(generateRosary('la'), rosaryToJSON, 2);
process.stdout.write(`${content}\n`);
