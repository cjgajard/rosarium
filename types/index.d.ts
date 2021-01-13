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

type PrayerKey = 'credo' | 'fatimasPrayer' | 'finalDoxology' | 'gloryBe' |
  'hailHolyQueen' | 'hailMary' | 'lordsPrayer' | 'letUsPray' | 'saintMichael' |
  'signOfTheCross' | 'subTuum';

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

type Lang = 'en' | 'es' | 'la';

type LanguageMap = {
  [K in Lang]: string;
}

type LangContentMap = {
  [K in Lang]: IContent;
}

interface RosaryConfig {
  fatimasPrayer: boolean;
  finalDoxology: boolean;
  letUsPray: boolean;
  saintMichael: boolean;
  subTuum: boolean;
}
