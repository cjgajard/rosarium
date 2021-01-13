import { LANGUAGES, isLang } from '../lib/gen-lang';
import generateRosary, { Rosary } from './generate-rosary';

// HACK: allows iterating through keys without losing type information.
/* eslint-disable */
declare global { // HACK
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}
Object.typedKeys = Object.keys as any;
/* eslint-enable */

declare interface IView {
  wrapper: Element;
  language: HTMLSelectElement;
  submit: HTMLButtonElement;
  config: () => RosaryConfig;
}

const hydrateContent = (): DynElem<IPrayer> | null => {
  const $content = document.getElementById('content');
  if (!$content)
    return null;
  return {
    clear() {
      $content.innerHTML = '';
    },
    update(resp: IPrayer) {
      const verses = resp.verses.map((ve: string) => (
        `<p class="verse">${ve}</p>`
      ));
      $content.innerHTML = (
        `<h2 class="content_title">
          ${(resp.title + (resp.repetition ? ` #${resp.repetition}` : ''))}
        </h2>
        <div class="content_text">${verses.join('')}</div>`
      );
    },
  };
};

const createSelect = (wrapper: Element): HTMLSelectElement | null => {
  const $select = wrapper.querySelector('[name="lang"]');
  if (!$select)
    return null;
  Object.typedKeys(LANGUAGES).forEach((lang) => {
    $select.innerHTML += `<option value="${lang}">${LANGUAGES[lang]}</option>`;
  });
  return $select as HTMLSelectElement;
};

const createConfiguration = (): IView | null => {
  const wrapper = document.getElementById('config');
  if (!wrapper)
    return null;
  const checkbox = (name: string) => {
    const obj = wrapper.querySelector<HTMLInputElement>(`[name="${name}"]`);
    return () => obj ? obj.checked : false;
  };
  const language = createSelect(wrapper);
  if (!language)
    return null;
  const submit = document.getElementById('start');
  if (!submit)
    return null;
  const fatimasPrayer = checkbox('fatimasPrayer');
  const finalDoxology = checkbox('finalDoxology');
  const letUsPray = checkbox('letUsPray');
  const saintMichael = checkbox('saintMichael');
  const subTuum = checkbox('subTuum');
  return {
    config: () => ({
      fatimasPrayer: fatimasPrayer(),
      finalDoxology: finalDoxology(),
      letUsPray: letUsPray(),
      saintMichael: saintMichael(),
      subTuum: subTuum(),
    }),
    language,
    submit: submit as HTMLButtonElement,
    wrapper,
  };
};

let iterator: Rosary | null = null;

document.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.getElementById('next');
  if (!nextButton)
    return;
  const configuration = createConfiguration();
  if (!configuration)
    return;
  const content = hydrateContent();
  if (!content)
    return;

  const toggleRunning = (start: boolean) => {
    if (start) {
      configuration.wrapper.setAttribute('hidden', 'hidden');
      nextButton.removeAttribute('hidden');
    }
    else {
      content.clear();
      nextButton.setAttribute('hidden', 'hidden');
      configuration.wrapper.removeAttribute('hidden');
      configuration.language.focus();
    }
  };

  const onNext = () => {
    if (!iterator)
      return;
    const { value, done } = iterator.next();
    if (done) {
      toggleRunning(false);
      return;
    }
    content.update(value);
  };

  nextButton.addEventListener('click', onNext);
  configuration.submit.addEventListener('click', () => {
    const lang = configuration.language.value;
    if (!isLang(lang)) {
      console.error(`Language '${lang}' is not supported`);
      return;
    }
    const rosary = generateRosary(lang, configuration.config());
    iterator = rosary;
    toggleRunning(true);
    onNext();
    nextButton.focus();
  });
});
