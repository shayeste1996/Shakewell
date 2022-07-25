interface IObjectKeys {
  [key: string]: string | number;
}
// in miliseconds
interface Units extends IObjectKeys {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
const units: Units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export const getRelativeTime = (d1: number, d2: Date = new Date()) => {
  var elapsed = d1 - Number(d2);
  let u: any;
  for (u in units)
    if (Math.abs(elapsed) > units[u] || u == "second")
      return rtf.format(Math.round(elapsed / +units[u]), u);
};
