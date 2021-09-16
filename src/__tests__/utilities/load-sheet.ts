import * as fs from 'fs';
import { promisify } from 'util'
global.DOMParser = window.DOMParser
const readFile = promisify(fs.readFile)

export enum SheetExamples {
  TheSilentKing
}

function loadSheetAsString(sheetExample: SheetExamples) {
  switch (sheetExample) {
    case SheetExamples.TheSilentKing:
      return loadHtml('src/__tests__/test-sheets/SilentKing.html')
  }
}

export async function loadSheet(sheetExample: SheetExamples): Promise<Document> {
  const sheetHtmlString = await loadSheetAsString(sheetExample);
  return new DOMParser().parseFromString(sheetHtmlString, 'text/html');
}

export async function loadHtml(path: string) {
  let buffer = await readFile(path);
  return buffer.toString()
}
