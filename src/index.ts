import generateRosary, { LANGUAGES, Rosary, toLanguage } from '../lib/generate-rosary';

declare interface Configuration {
  wrapper: Element;
  language: HTMLSelectElement;
  fatimasPrayer: HTMLInputElement;
  finalDoxology: HTMLInputElement;
  submit: HTMLButtonElement;
}

declare interface IState {
  current?: IteratorResult<IPrayer | void>;
  running: boolean;
}

const LANGNAME = {
  en: 'English',
  la: 'Latin',
};

const state: IState = {
  running: false,
};

const hydrateContent = (): DynElem<IPrayer> | null => {
  const $content = document.getElementById('content');
  if (!$content)
    return null;
  const $title = $content.querySelector('.content_title');
  if (!$title)
    return null;
  const $text = $content.querySelector('.content_text');
  if (!$text)
    return null;
  return {
    clear() {
      $title.innerHTML = '';
      $text.innerHTML = '';
    },
    update(result: IPrayer) {
      $title.innerHTML = result.title + (
        result.repetition ? ` #${result.repetition}` : ''
      );
      $text.innerHTML = result.verses.map((ve: string, idx: number) => {
        return `<p class="verse">${ve.replace(/\n/g, '<br/>')}</p>`;
      }).join('');
    },
  };
};

const createSelect = (wrapper: Element): HTMLSelectElement | null => {
  const $select = wrapper.querySelector('[name="lang"]');
  if (!$select)
    return null;
  LANGUAGES.forEach((lang) => {
    $select.innerHTML += `
        <option value="${lang}">${LANGNAME[lang]}</option>
      `;
  });
  return $select as HTMLSelectElement;
};

const createConfiguration = (): Configuration | void => {
  const wrapper = document.getElementById('config');
  if (!wrapper)
    return;
  const language = createSelect(wrapper);
  if (!language)
    return;
  const submit = document.getElementById('start');
  if (!submit)
    return;
  const fatimasPrayer = wrapper.querySelector('[name="fatimasPrayer"]');
  if (!fatimasPrayer)
    return;
  const finalDoxology = wrapper.querySelector('[name="finalDoxology"]');
  if (!finalDoxology)
    return;
  return {
    language,
    submit: submit as HTMLButtonElement,
    fatimasPrayer: fatimasPrayer as HTMLInputElement,
    finalDoxology: finalDoxology as HTMLInputElement,
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
      state.running = true;
    }
    else {
      content.clear();
      nextButton.setAttribute('hidden', 'hidden');
      configuration.wrapper.removeAttribute('hidden');
      configuration.language.focus();
      state.running = false;
    }
  };

  const onNext = () => {
    if (!iterator)
      return;
    const { value, done } = iterator.next();
    if (done)
      return toggleRunning(false);
    content.update(value);
    nextButton.focus();
  };

  nextButton.addEventListener('click', onNext);
  configuration.submit.addEventListener('click', () => {
    if (state.running)
      return;
    const config: RosaryConfig = {
      fatimasPrayer: configuration.fatimasPrayer.checked,
      finalDoxology: configuration.finalDoxology.checked,
      language: toLanguage(configuration.language.value),
    };
    const rosary = generateRosary(config);
    iterator = rosary;
    toggleRunning(true);
    onNext();
  });
});
