import contentEn from '../text/en.json';
import contentEs from '../text/es.json';
import contentLa from '../text/la.json';

const NORMAL_CHAIN = 10;
const SHORT_CHAIN = 3;
const MYSTERIES_NUM = 5;

enum NameOfDay {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

const CONTENTS: LangContentMap = {
  en: contentEn,
  es: contentEs,
  la: contentLa,
};

export type Rosary = IterableIterator<IPrayer | INodeKey>;

export default (config: RosaryConfig): Rosary => {
  const content: IContent = CONTENTS[config.lang];

  let mysteryName: MysteryKey; // eslint-disable-line init-declarations
  switch (new Date().getDay()) {
  case NameOfDay.MON:
  case NameOfDay.THU:
    mysteryName = 'joyful';
    break;
  case NameOfDay.WED:
  case NameOfDay.SAT:
    mysteryName = 'glorious';
    break;
  case NameOfDay.TUE:
  case NameOfDay.FRI:
    mysteryName = 'sorrowful';
    break;
  default:
    mysteryName = 'glorious';
  }

  const mysteries = content.mysteries[mysteryName];
  let mystery = 0;

  const lords = { ...content.prayers.lordsPrayer };
  if (config.finalDoxology)
    lords.verses = lords.verses.concat(content.prayers.finalDoxology.verses);

  const chain = function *() {
    if (mystery >= 1) {
      yield mysteries[mystery];
    }
    else {
      yield content.prayers.signOfTheCross;
      yield content.prayers.credo;
    }
    yield lords;
    for (let it = 0; it < (mystery ? NORMAL_CHAIN : SHORT_CHAIN); it++)
      yield { ...content.prayers.hailMary, repetition: it + 1 };
    yield content.prayers.gloryBe;
    if (config.fatimasPrayer)
      yield content.prayers.fatimasPrayer;
    mystery++;
  };

  const iterator = (function *() {
    // for (let it = 0; it < MYSTERIES_NUM; it++) {
    for (let it = 0; it < 1; it++) {
      for (const value of chain())
        yield value;
    }
    yield content.prayers.hailHolyQueen;
    yield content.prayers.oremus;
  }());
  return iterator;
};
