export function parseSheet(sheet: Document): Army {
  const elementNodeListOf = sheet.querySelectorAll('.battlescribe > ul > li');
  let detachmentsHtml = [...elementNodeListOf];
  return {
    detachments: detachmentsHtml.map(html => parseDetachment(html))
  }
}

export function parseDetachment(detachment: Element): Detachment {
  let unitsHtml = [...detachment.querySelectorAll('ul > .category > ul > li')]

  return {
    units: filterCruftUnits(unitsHtml.map(html => parseUnit(html)))
  }
}

export function parseUnit(unitHtml: Element): Unit {
  let querySelector = unitHtml.querySelector('h4');
  let name = querySelector!.innerHTML

  let modelsHtml = [...unitHtml.querySelectorAll('li')];
  let categories = unitHtml.querySelectorAll('.caps')[0]?.textContent?.split(',') ?? [];
  return {
    name: name,
    models: modelsHtml.map(html => parseModel(html)),
    categories: categories
  }
}

export function filterCruftUnits(units: Unit[]): Unit[] {
  const textsToFilter = ['Battle Size', 'Detachment Command Cost', 'Dynasty Choice'];
  return units.filter(unit => !textsToFilter.some(text => unit.name.includes(text)))
}

export function parseModel(modelHtml: Element): Model {
  const titleH4 = modelHtml.querySelector('h4');
  if (!titleH4) {
    throw new Error('No Title found for model')
  }
  let title = titleH4.innerHTML;
  let categories = modelHtml.querySelectorAll('.caps')[0]?.textContent?.split(',') ?? [];

  return {
    ...parseModelTitle(title),
    categories
  }
}

function parseModelTitle(title: string): { name: string, quantity: number } {
  const regex = /^([0-9]+x )/

  let match = title.match(regex);
  if (match && match[0]) {
    let strings = match[0].slice(0, -2);
    return { name: title.replace(match[0], ''), quantity: parseInt(strings) };
  } else {
    return { name: title, quantity: 1 }
  }
}

export interface Army {
  detachments: Detachment[];
}

export interface Detachment {
  units: Unit[];
}

export interface Unit {
  name: string;
  models: Model[];
  categories: string[];
}

export interface Model {
  name: string;
  quantity: number;
  categories: string[];
}
