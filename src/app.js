import { initData, mutationDataWithId, resetTable,  data } from "./data"
import { bestRacersBlock, objectBlock, insertInfoHeaders, insertBestRacersHeaders } from "./blocks"
import { getAppElement, getTableElement, clearTemplate } from "./utils";

export async function appStart($app) {
    
    $app.addEventListener("click", identificationElement)

    insertLoader($app)

    const initialData = await initData()

    clearTemplate($app)
    renderTemplate(initialData, $app)
}

export function renderTemplate(data, $app) {
    insertTable($app)

    const $table = getTableElement()

    insertStaticBlocks(data, $table)
    renderDynamicBlocks(data, $table)
}

function insertStaticBlocks(data, $table) {
    insertBestRacersHeaders($table)
    insertBestRacers(data.bestRacersList.bestRacers,$table)
    insertSelect($table, data.bestRacersList)
}

function renderDynamicBlocks(data, $table) {
    insertInfoHeaders(data.mainList[0], $table)
    insertMainInfo(data.mainList, $table)
}

function identificationElement(event) {
    let id = event.target.id
    const $app = getAppElement()

    if (id != 'reset' && id != '') {
        mutationDataWithId(id)
        clearTemplate($app)
        renderTemplate(data, $app)
    } else if (id === 'reset') {
        resetTable()
        clearTemplate($app)
        renderTemplate(data, $app)
    }
}

function insertTable($app) {
    $app.insertAdjacentHTML('beforeend', '<table id="table"><table/>' )
}

function insertBestRacers(bestRacers, $table) {
    bestRacers.map( object => {
        $table.insertAdjacentHTML('beforeend', bestRacersBlock(object))
    })
}

function insertMainInfo(data, $table) {
    data.map(object => {
        $table.insertAdjacentHTML('beforeend', objectBlock(object))
    })
}

function insertLoader($app) {
    const loader = '<div class="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>'
    $app.insertAdjacentHTML('beforeend', loader )
}

function insertSelect($table, bestRacersList) {
    $table.insertAdjacentHTML('beforebegin', '<div class="select"><p>Выберите номер заезда для сортировки турнирной таблицы:</p></div>')

    const $select = document.querySelector('.select')
    const resetButton = `<div>
                            <button id="reset" 
                                class="btn-flat waves-effect waves-light btn-small btn-select">
                                    Сбросить
                            </button>
                        </div>`
    let counter = 0

    bestRacersList.bestRacers.map(() => {
        counter++
        let numButton = `<div>
                            <button id='${counter}' 
                                class="btn-flat waves-effect waves-light btn-small btn-select"> 
                                ${counter}  
                            </button>
                        </div>`
                            

        $select.insertAdjacentHTML('beforeend', numButton )
    })
    
    $select.insertAdjacentHTML('beforeend', resetButton )
}










