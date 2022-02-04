import { breakPointColumns } from '../components/MasonryLayout';

class Utils {
  public generateRandomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public caculateColumnCount(windowWidth: number, breakPointOption: breakPointColumns) {
    let validWidth = Number.MAX_SAFE_INTEGER;
    let columnCount = breakPointOption.default || 5;

    for (let breakPoint in breakPointOption) {
      const bp = Number(breakPoint);

      if (validWidth < bp) break;
      if (windowWidth <= bp) {
        validWidth = bp;
        columnCount = breakPointOption[breakPoint];
      }
    }

    return columnCount;
  }
}

export default Utils;
