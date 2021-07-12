import React from "react";

export type PrayerProps = {
  title: string;
  verses: VerseItem[];
  repetition?: number;
};

export const Prayer = (props: PrayerProps): JSX.Element => {
  const { repetition, title, verses } = props;

  const repetitionLabel = repetition ? ` #${repetition}` : "";

  return (
    <div className="prayer">
      <h2 className="prayer-title">
        {title}
        {repetitionLabel}
      </h2>
      {verses.map((v: VerseItem) => (
        <p key={v.key} className="prayer-verse">
          {v.value}
        </p>
      ))}
    </div>
  );
};

export type VerseItem = {
  key: number;
  value: string;
};
