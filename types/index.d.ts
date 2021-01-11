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
type INodeKey = INode | string | string[];

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

type LangMap = {
  [key: string]: INode;
}

interface DynElem<T> {
  clear();
  update(result: T);
}

interface RosaryConfig {
  finalDoxology: boolean;
  fatimasPrayer: boolean;
  language: Language;
}
