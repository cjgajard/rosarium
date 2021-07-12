import selectMystery from "../select-mystery";
import { CONTENT } from "../../text";

const NORMAL_CHAIN = 10;
const SHORT_CHAIN = 3;
const MYSTERIES_NUM = 5;

export type Titles = {
  rosary: string;
  mysteries: string[];
  prayers: string[];
};

export default (config: RosaryConfig): Rosary => {
  const content: IContent = CONTENT[config.language];
  const mysteryName = selectMystery(config);
  const mysteries = content.mysteries[mysteryName];
  let round = 0;

  const lords = { ...content.prayers.lordsPrayer };
  if (config.finalDoxology)
    lords.verses = lords.verses.concat(content.prayers.finalDoxology.verses);

  const chain = function* () {
    if (round >= 1) {
      yield mysteries[round];
    } else {
      yield content.prayers.signOfTheCross;
      yield content.prayers.credo;
    }
    yield lords;
    for (let it = 0; it < (round ? NORMAL_CHAIN : SHORT_CHAIN); it++)
      yield { ...content.prayers.hailMary, repetition: it + 1 };
    yield content.prayers.gloryBe;
    if (config.fatimasPrayer) yield content.prayers.fatimasPrayer;
    round++;
  };

  const iterator = (function* () {
    for (let it = 0; it <= MYSTERIES_NUM; it++) {
      for (const value of chain()) yield value;
    }
    yield content.prayers.hailHolyQueen;
    if (config.letUsPray) yield content.prayers.letUsPray;
    if (config.saintMichael) yield content.prayers.saintMichael;
    if (config.subTuum) yield content.prayers.subTuum;
  })();
  return iterator;
};
