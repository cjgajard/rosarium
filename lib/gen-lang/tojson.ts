interface Value {
  text: string;
  children: Value[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (key: string, value: Value): any => {
  switch (key) {
    case "parent":
    case "level":
    case "children":
      return void 0;
    case "verses":
    case "title":
    case "text":
      return value;
    default:
  }

  if (typeof value.children !== "undefined" && !value.children.length)
    return value.text;
  const [title, ...content] = value.children;
  if (!content.length) return title.text;
  if (!content[0].children.length)
    return { title: title.text, verses: content };
  return content.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (memo: any, item: any) => {
      memo[item.text] = item;
      return memo;
    },
    {
      title: title.text,
    }
  );
};
