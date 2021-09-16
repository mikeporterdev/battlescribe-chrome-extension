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

    it('should set warlord as property rather than model', async() => {
      const army = await whenParseSheet();
      const tsk = army.detachments[1]?.units[0]
      expect(tsk?.warlord).toBeTruthy()
    })

    it('should have two menhirs in TSK unit', async () => {
      const army = await whenParseSheet();
      const tskUnit = army.detachments[1]?.units[0];

      expect(tskUnit?.categories).toHaveLength(3)
      expect(tskUnit?.categories).toStrictEqual(['Faction: Necrons', 'Faction: Szarekhan', 'Primarch | Daemon Primarch | Supreme Commander'])

      const models = army.detachments[1]?.units[0]?.models ?? [];
      const menhirs = models[1];
      expect(menhirs?.quantity).toBe(2)
    });

    it('should load categories for silent king units', async () => {
      const army = await whenParseSheet();
      const tskUnit = army.detachments[1]?.units[0];

      expect(tskUnit?.categories).toHaveLength(3)
      expect(tskUnit?.categories).toStrictEqual(['Faction: Necrons', 'Faction: Szarekhan', 'Primarch | Daemon Primarch | Supreme Commander'])

      const models = army.detachments[1]?.units[0]?.models ?? [];
      const [szarekh, menhirs] = models
      expect(szarekh?.categories).toHaveLength(9)
      expect(menhirs?.categories).toHaveLength(5)
    });
  });

});
