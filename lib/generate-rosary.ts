import contentEn from '../text/en.json';
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

// eslint-disable-next-line max-len
const generate = (config: RosaryConfig): IterableIterator<IPrayer | INodeKey> => {
  let content: IContent;
  switch (config.language) {
  case Language.en:
    content = contentEn;
  case Language.la:
  default:
    content = contentLa;
  }

  let mysteryName: MysteryKey;
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
    for (let it = 0; it < MYSTERIES_NUM; it++) {
      for (const value of chain())
        yield value;
    }
    yield content.prayers.hailHolyQueen;
    yield content.prayers.oremus;
  }());
  return iterator;
};

enum Language {
  en = 'en',
  la = 'la'
}

export const LANGUAGES = [
  Language.en,
  Language.la,
];

interface IContent {
  prayers: IPrayerMap;
  mysteries: IMysteryMap;
}

export const toLanguage = (key: string): Language | void => {
  switch (key) {
  case 'en':
    return Language.en;
  case 'la':
    return Language.la;
  default:
    return void 0;
  }
}

export type Rosary = ReturnType<typeof generate>;
export default generate;
