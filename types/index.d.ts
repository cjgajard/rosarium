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

type PrayerKey =
  | "credo"
  | "fatimasPrayer"
  | "finalDoxology"
  | "gloryBe"
  | "hailHolyQueen"
  | "hailMary"
  | "lordsPrayer"
  | "letUsPray"
  | "saintMichael"
  | "signOfTheCross"
  | "subTuum";

type IPrayer = {
  title: string;
  verses: string[];
  repetition?: number;
};

type IPrayerMap = {
  readonly [K in PrayerKey]: IPrayer;
};

type MysteryKey = "joyful" | "glorious" | "sorrowful" | "luminous";
type IMysteryMap = {
  readonly [K in MysteryKey]: INode;
};

interface IContent {
  title: string;
  prayers: IPrayerMap;
  mysteries: IMysteryMap;
  ui: INode;
}

interface DynElem<T> {
  clear();
  update(result: T);
}

type Lang = "en" | "es" | "la";

type LangTuple = [Lang, string];

type LanguageMap = {
  [K in Lang]: string;
};

type LangContentMap = {
  [K in Lang]: IContent;
};

interface RosaryConfig {
  language: Lang;
  mystery: string;

  fatimasPrayer: boolean;
  finalDoxology: boolean;
  letUsPray: boolean;
  luminous: boolean;
  saintMichael: boolean;
  subTuum: boolean;
}

type Rosary = IterableIterator<IPrayer | INodeKey>;
