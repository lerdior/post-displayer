import React, { useMemo } from "react";

enum TitleSize {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
}

interface TitleProps {
  text: string;
  titleSize: TitleSize;
}

type Text = { text: string };

const TitleElementBasedOnTitleSize = {
  [TitleSize.One]: ({ text }: Text) => <h1>{text}</h1>,
  [TitleSize.Two]: ({ text }: Text) => <h2>{text}</h2>,
  [TitleSize.Three]: ({ text }: Text) => <h3>{text}</h3>,
  [TitleSize.Four]: ({ text }: Text) => <h4>{text}</h4>,
  [TitleSize.Five]: ({ text }: Text) => <h5>{text}</h5>,
  [TitleSize.Six]: ({ text }: Text) => <h6>{text}</h6>,
};

function Title({ text, titleSize }: TitleProps) {
  const TitleComponent = useMemo(() => TitleElementBasedOnTitleSize[titleSize], [titleSize]);
  return <TitleComponent text={text} />;
}

export default Title;
