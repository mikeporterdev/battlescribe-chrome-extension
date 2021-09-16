export function parseSheet(sheet: Document): Army {
  let detachmentsHtml = [...sheet.querySelectorAll('.battlescribe > ul > li')];
  return {
    detachments: detachmentsHtml.map(html => parseDetachment(html))
  }
}

export function parseDetachment(detachment: Element): Detachment {
  let unitsHtml = [...detachment.querySelectorAll('ul > .category > ul > li')]

  return {
    units: unitsHtml.map(html => parseUnit(html))
  }
}

export function parseUnit(unitHtml: Element): Unit {
  let querySelector = unitHtml.querySelector('h4');
  let name = querySelector!.innerText

  let modelsHtml = [...unitHtml.querySelectorAll('li')];
  let categories = unitHtml.querySelectorAll('.caps')[0]?.textContent?.split(',') ?? [];
  return {
    name: name,
    models: modelsHtml.map(html => parseModel(html)),
    categories: categories
  }
}


export function parseModel(modelHtml: Element): Model {
  let title = modelHtml.querySelector('h4')!.innerText;
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
