export const regexpPatterns = {
  RE_URL: /^https?:\/\/(?:www\.)?[-a-z0-9@:%._+~#=]{1,256}\.[a-z0-9()]{1,6}\b(?:[-a-z0-9()@:%_+.~#?&/=]*)$/i,
}

export function* textSlicer(text: string, pattern: RegExp) {
  const source = pattern.source.replace(/(^\^)|(\$$)/g, '');
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;  
  const re = new RegExp(source, flags);
  let cursor = 0;

  while (true) {
    const match = re.exec(text);
    if (!match) break;
    const str = text.substring(cursor,match.index)
    cursor = match.index + match[0].length;
    yield [str, match[0]];
  }
  const str = text.substring(cursor, )
  if (str) yield [str];
}