export const LANGUAGES: LanguageMap = {
  en: 'English',
  es: 'Español',
  la: 'Latina',
};

export const isLang = (code: string): code is Lang => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (LANGUAGES as any)[code] !== 'undefined'
);
