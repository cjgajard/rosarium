import React from "react";
import Action from "./components/Action";
import Checkbox from "./components/Checkbox";
import I from "./components/I";
import Prayer, { VerseItem } from "./components/Prayer";
import Select from "./components/Select";
import generateRosary from "../lib/gen-rosary";
import { Languages, isLang } from "../lib/lang";
import { CONTENT } from "../text";

let verseKey = 0;
let prayerKey = 0;

export const App = (): JSX.Element => {
  const [running, setRunning] = React.useState(false);
  const [rosary, setRosary] = React.useState<Rosary | null>(null);
  const [prayers, setPrayers] = React.useState<PrayerItem[]>([]);
  const [config, setConfig] = React.useState<RosaryConfig>({
    language: "en",
    mystery: "",
    fatimasPrayer: true,
    finalDoxology: false,
    letUsPray: false,
    luminous: true,
    saintMichael: false,
    subTuum: false,
  });

  const handleClose = () => {
    setRunning(false);
  };

  const handleNext = () => {
    if (rosary === null) return;
    const { value, done } = rosary.next();
    if (done) {
      handleClose();
      return;
    }
    setPrayers([...prayers, createPrayerItem(value)]);
  };

  const handleStart = () => {
    const rosaryGenerator = generateRosary(config);
    const { value, done } = rosaryGenerator.next();
    if (done) {
      handleClose();
      return;
    }
    setRosary(rosaryGenerator);
    setRunning(true);
    setPrayers([createPrayerItem(value)]);
  };

  React.useEffect(() => {
    if (running) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [running, prayers]);

  return (
    <main>
      <h1>{CONTENT[config.language].title}</h1>
      {!running && (
        <p className="github">
          Read the source code at{" "}
          <a
            className="github-link"
            href="https://github.com/cjgajard/rosarium/"
          >
            github.com
          </a>
        </p>
      )}
      <div className="content">
        {!running && (
          <div id="config">
            <I>
              <Select
                name="lang"
                value={config.language}
                onChange={(v: string) => {
                  if (!isLang(v)) return;
                  setConfig({ ...config, language: v });
                }}
                options={languageOptions}
              />
            </I>
            <I>
              <Select
                name="mystery"
                value={config.mystery}
                onChange={(v: string) => setConfig({ ...config, mystery: v })}
                options={getMysteryOptions(config.language)}
              />
            </I>
            {config.mystery === "" && (
              <I>
                <Checkbox
                  name="luminous"
                  checked={config.luminous}
                  onChange={(v: boolean) =>
                    setConfig({ ...config, luminous: v })
                  }
                >
                  {CONTENT[config.language].ui.useLuminous}
                </Checkbox>
              </I>
            )}
            <I>
              <Checkbox
                name="fatimasPrayer"
                checked={config.fatimasPrayer}
                onChange={(v: boolean) =>
                  setConfig({ ...config, fatimasPrayer: v })
                }
              >
                {CONTENT[config.language].prayers.fatimasPrayer.title}
              </Checkbox>
            </I>
            <I>
              <Checkbox
                name="finalDoxology"
                checked={config.finalDoxology}
                onChange={(v: boolean) =>
                  setConfig({ ...config, finalDoxology: v })
                }
              >
                {CONTENT[config.language].prayers.finalDoxology.title}
              </Checkbox>
            </I>
            <I>
              <Checkbox
                name="letUsPray"
                checked={config.letUsPray}
                onChange={(v: boolean) =>
                  setConfig({ ...config, letUsPray: v })
                }
              >
                {CONTENT[config.language].prayers.letUsPray.title}
              </Checkbox>
            </I>
            <I>
              <Checkbox
                name="saintMichael"
                checked={config.saintMichael}
                onChange={(v: boolean) =>
                  setConfig({ ...config, saintMichael: v })
                }
              >
                {CONTENT[config.language].prayers.saintMichael.title}
              </Checkbox>
            </I>
            <I>
              <Checkbox
                name="subTuum"
                checked={config.subTuum}
                onChange={(v: boolean) => setConfig({ ...config, subTuum: v })}
              >
                {CONTENT[config.language].prayers.subTuum.title}
              </Checkbox>
            </I>
          </div>
        )}
        {prayers.map((p: PrayerItem) => (
          <Prayer {...p} />
        ))}
      </div>
      <Action>
        <I>
          <button
            id="next"
            type="button"
            className="btn"
            onClick={running ? handleNext : handleStart}
          >
            {running ? "Next" : "Start"}
          </button>
        </I>
      </Action>
    </main>
  );
};

const getMysteryOptions = (lang: Lang) => [
  { value: "", label: CONTENT[lang].ui.forToday as string },
  { value: "joyful", label: CONTENT[lang].mysteries.joyful.title },
  { value: "glorious", label: CONTENT[lang].mysteries.glorious.title },
  { value: "sorrowful", label: CONTENT[lang].mysteries.sorrowful.title },
  { value: "luminous", label: CONTENT[lang].mysteries.luminous.title },
];

const languageOptions = Languages.map(([a, b]: LangTuple) => ({
  label: b,
  value: a,
}));

type PrayerItem = IPrayer & { key: number; verses: VerseItem[] };

const createPrayerItem = (value: IPrayer | INodeKey) => {
  return {
    key: prayerKey++,
    ...value,
    verses: value.verses.map((v: string) => ({
      key: verseKey++,
      value: v,
    })),
  };
};
