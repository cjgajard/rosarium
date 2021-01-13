/* eslint-disable no-magic-numbers */
enum NameOfDay {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

type Times = 'advent' | 'christmas' | 'easter' | 'lent' | 'ordinary' ;

const getEaster = (year: number): Date => {
  /* eslint-disable id-length, no-mixed-operators */
  const A = year % 10;
  const B = Math.floor(year / 100);
  const C = year % 100;
  const D = Math.floor(B / 4);
  const E = B % 4;
  const F = Math.floor((B + 8) / 25);
  const G = Math.floor((B - F + 1) / 3);
  const H = (19 * A + B - D - G + 15) % 30;
  const I = Math.floor(C / 4);
  const K = C % 4;
  const L = (32 + 2 * E + 2 * I - H - K) % 7;
  const M = Math.floor((A + 11 * H + 22 * L) / 451);
  const N = H + L - 7 * M + 114;

  const month = Math.floor(N / 31);
  const date = (N % 31) + 1;
  return new Date(year, month - 1, date);
  /* eslint-enable id-length, no-mixed-operators */
};

const dayDiff = (ref: Date, diff: number): Date => {
  const day = new Date(ref);
  day.setDate(day.getDate() + diff);
  return day;
};

const getLiturgicalTime = (now: Date): Times => {
  const numnow = Number(now);
  const year = now.getFullYear();

  const christmas = new Date(year, 12, 25);
  if (numnow >= Number(christmas))
    return 'christmas';

  const advent = dayDiff(christmas, -(((christmas.getDay() + 6) % 7) + 22));
  if (numnow >= Number(advent))
    return 'advent';

  const easter = getEaster(year);

  const baptismOfJesus = dayDiff(easter, -77);
  if (numnow < Number(baptismOfJesus))
    return 'christmas';

  const ashWednesday = dayDiff(easter, -77);
  if (numnow < Number(ashWednesday))
    return 'lent';

  const palmSunday = dayDiff(easter, -7);
  if (numnow < Number(palmSunday))
    return 'ordinary';

  const afterPentecost = dayDiff(easter, 50);
  if (numnow < Number(afterPentecost))
    return 'easter';

  return 'ordinary';
};

export const dailyMystery = (config: RosaryConfig): MysteryKey => {
  const now = new Date();
  switch (now.getDay()) {
  case NameOfDay.MON:
    return 'joyful';
  case NameOfDay.TUE:
    return 'sorrowful';
  case NameOfDay.WED:
    return 'glorious';
  case NameOfDay.THU:
    if (config.luminous)
      return 'luminous';
    return 'joyful';
  case NameOfDay.FRI:
    return 'sorrowful';
  case NameOfDay.SAT:
    if (config.luminous)
      return 'joyful';
    return 'glorious';
  default:
    break;
  }

  /*
   * Traditional:
   * In Advent, Christmas, and Time After Epiphany:  Joyful
   * In Septuagesima and Lent:  Sorrowful
   * In Easter and Time After Pentecost:  Glorious
   *
   * Novus Ordo:
   * In Advent, Christmas:  Joyful
   * In Lent:  Sorrowful
   * In Easter and Ordinary Time:  Glorious
   */
  switch (getLiturgicalTime(now)) {
  case 'advent':
  case 'christmas':
    return 'joyful';
  case 'lent':
    return 'sorrowful';
  case 'easter':
  case 'ordinary':
    return 'glorious';
  default:
    // unreachable
    return 'glorious';
  }
};

export default (config: RosaryConfig): MysteryKey => {
  switch (config.mystery) {
  case 'joyful':
  case 'glorious':
  case 'sorrowful':
  case 'luminous':
    return config.mystery;
  default:
    return dailyMystery(config);
  }
};
