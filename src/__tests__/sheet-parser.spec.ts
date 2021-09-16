import { loadSheet, SheetExamples } from './utilities/load-sheet';
import { parseSheet } from '../sheet-parser';

describe('Sheet Parser', () => {

  describe('The Silent King list', () => {
    const whenParseSheet = async () => {
      let sheetHtml = await loadSheet(SheetExamples.TheSilentKing);
      return parseSheet(sheetHtml);
    }

    it('should equal find two detachments', async () => {
      const army = await whenParseSheet()
      expect(army.detachments).toHaveLength(2);
    });

    it('should have names for units', async () => {
      const army = await whenParseSheet();
      expect(army.detachments[0]?.units[0]?.name).toBeDefined()

    });

    it('should filter out units named Battle Size', async () => {
      const army = await whenParseSheet();
      const allUnits = army.detachments.flatMap(detachment => detachment.units);
      expect(allUnits.find(unit => unit.name.includes('Battle Size'))).toBeUndefined()

    });

    it('should have the right number of units', async () => {
      const army = await whenParseSheet()
      const allUnits = army.detachments.flatMap(detachment => detachment.units);
      expect(allUnits).toHaveLength(5)
    });
  });

});
