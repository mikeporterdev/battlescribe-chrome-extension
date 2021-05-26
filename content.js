const allUnits = [...document.querySelectorAll('.rootselection')]
allUnits.map(addXToUnit);


function addXToUnit(unit) {
    let link = document.createElement('a');
    link.textContent = '     X'
    link.href = '#'
    link.onclick = () => hideUnit(unit)
    unit.querySelector('h4').appendChild(link);
}

function hideUnit(unit) {
    let everythingExceptTitle = unit.querySelectorAll(':not(h4)');
    everythingExceptTitle.forEach(elem => {
        elem.style.display = 'none';
    })

    let title = unit.querySelector('h4');
    title.style['text-decoration'] = 'line-through'
}

deleteUselessShit();

function deleteUselessShit() {
    document.querySelectorAll('.rootselection').forEach(elem => {
        const title = elem.querySelector('h4')
        let titleText = title.innerText;
        if (titleText.includes('Detachment Command Cost') || titleText.includes('Battle Size')) {
            elem.style.display = 'none';
        }
    })
}
