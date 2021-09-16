import { overallCss } from './overall-css';
import { parseSheet } from './sheet-parser';

function init() {
  console.log(parseSheet(document))

  addOverallStylingCss()
  addFeaturesToUnits();
  deleteUselessShit()
}

function addFeaturesToUnits() {
  const allUnits = [...document.querySelectorAll<HTMLElement>('.rootselection')]
  allUnits.map(addXToUnit);
}

function addXToUnit(unit: HTMLElement) {
  let link = document.createElement('a');
  link.classList.add('x-link')
  link.textContent = '     X'
  link.href = '#'
  link.onclick = () => hideUnit(unit)
  unit.querySelector('h4')?.appendChild(link);
}

function hideUnit(unit: HTMLElement) {
  let everythingExceptTitle = unit.querySelectorAll<HTMLElement>(':not(h4)');
  everythingExceptTitle.forEach(elem => {
    elem.style.display = 'none';
  })

  let title = unit.querySelector<HTMLElement>('h4');
  if (title)
    title.style.textDecoration = 'line-through'
}


function deleteUselessShit() {
  document.querySelectorAll<HTMLElement>('.rootselection').forEach(elem => {
    const title = elem.querySelector<HTMLElement>('h4')
    if (!title) {
      return
    }
    let titleText = title.innerText;
    if (titleText.includes('Detachment Command Cost') || titleText.includes('Battle Size')) {
      elem.style.display = 'none';
    }
  })
}

function addOverallStylingCss() {
  document.querySelector('head')!.innerHTML += `<style>${overallCss}</style>`
}

init()
