export const isPrayerKey = (code: string): code is PrayerKey => {
  if (code === "credo") return true;
  if (code === "fatimasPrayer") return true;
  if (code === "finalDoxology") return true;
  if (code === "gloryBe") return true;
  if (code === "hailHolyQueen") return true;
  if (code === "hailMary") return true;
  if (code === "lordsPrayer") return true;
  if (code === "letUsPray") return true;
  if (code === "saintMichael") return true;
  if (code === "signOfTheCross") return true;
  if (code === "subTuum") return true;
  return false;
};

export const isMysteryKey = (code: string): code is MysteryKey => {
  if (code === "joyful") return true;
  if (code === "glorious") return true;
  if (code === "sorrowful") return true;
  if (code === "luminous") return true;
  return false;
};

export const isUIKey = (code: string): code is UIKey => {
  if (code === "useLuminous") return true;
  if (code === "forToday") return true;
  return false;
};
