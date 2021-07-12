import toJSON from "./tojson";
import generator from "./generator";
import { isLang } from "../lang";

const code = process.argv[2];
if (isLang(code)) {
  const content = JSON.stringify(generator(code), toJSON, 2);
  process.stdout.write(`${content}\n`);
} else {
  process.stderr.write(`Unexpected code '${code}'.\n`);
  process.exit(1);
}
