interface INodeExt {
  children: INodeExt[];
  level: number;
  parent?: INodeExt;
  text: string;
}

interface INode {
  [key: string]: INode | string | string[];
  title: string;
  verses?: string[];
}

type INodeKey = typeof INode.key;

interface IPrayer {
  title: string;
  verses: string[];
  repetition?: number;
}

type PrayerKey = 'signOfTheCross' | 'credo' | 'lordsPrayer' | 'finalDoxology' |
  'hailMary' | 'gloryBe' | 'fatimasPrayer' | 'hailHolyQueen' | 'oremus';
type IPrayerMap = {
  readonly [K in PrayerKey]: IPrayer;
}

type MysteryKey = 'joyful' | 'glorious' | 'sorrowful' | 'luminous';
type IMysteryMap = {
  readonly [K in MysteryKey]: INode;
}

interface IContent {
  prayers: IPrayerMap;
  mysteries: IMysteryMap;
}

interface DynElem<T> {
  clear();
  update(result: T);
}

type Lang = 'en' | 'la';

type LanguageMap = {
  [K in Lang]: string;
}

type LangContentMap = {
  [K in Lang]: IContent;
}

interface RosaryConfig {
  finalDoxology: boolean;
  fatimasPrayer: boolean;
  lang: Lang;
}
