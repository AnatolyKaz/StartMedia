import { parseResultArray } from "./utils"

export function insertInfoHeaders(firstObject, $table) {
    let result = '<th >Результаты</th>'
    let sumResult = '<th class="centering">Сумма результатов</th>'

    if (firstObject.race != undefined) {
        result = `<th >Результат в ${firstObject.race} заезде</th>`
        sumResult = ''
    }

    const infoHeaders =  `  
        <h4>Турнирная таблица</h4>
        <th>Информация</th>
        ${result}
        ${sumResult}
        <th class="centering">Место</th>`

    $table.insertAdjacentHTML('beforeend', infoHeaders)    
}

export function insertBestRacersHeaders($table) {
    const BestRacersHeaders =  ` 
        <h4>Лучшие заезды</h4>
        <th>Информация</th>
        <th class="centering">Номер лучшего заезда</th>
        <th class="centering">Результат лучшего заезда</th>`
        
    $table.insertAdjacentHTML('beforeend', BestRacersHeaders)  
}

export function bestRacersBlock(object) {

    return ` <tr>
                <td>
                    <div>Имя: ${object.name}</div>
                    <div>Город: ${object.city}</div>
                    <div>Авто: ${object.car}</div>
                </td>
                <td class="centering">${object.race}</td>
                <td class="centering">${object.result}</td>
            </tr>`
}

export function objectBlock(object) {
    let results = ''
    let sumResult = `<td class="centering">${object.sumResult}</td>`

    if (typeof object.result != 'number') {
        results = `<td>${parseResultArray(object.results)}</td>`
    }

    if (object.race != undefined) {
        results = `<td>${object.result}</td>`
        sumResult = ''
    }

    return ` <tr>
                    <td class='info'>
                        <div>Имя: ${object.name}</div>
                        <div>Город: ${object.city}</div>
                        <div>Авто: ${object.car}</div>
                    </td>
                    ${results}
                    ${sumResult}
                    <td class="centering">${object.place}</td>
            </tr>`
}

