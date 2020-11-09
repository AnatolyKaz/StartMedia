export function sortResult (data){
    let arrayId = []
    let exitingArr = []

    let arr = [data].map(item => Object.values(item).map(i => arrayId.push(i.id)))
    let uniqArr = [...new Set(arrayId)]
    let mainArray = Object.values(data)

    uniqArr.map((id) => {
        let a = {id: id, result: []}

        mainArray.map(item => {
            if (id === item.id) {
                a.result.push(item.result)
            }
        })
        exitingArr.push(a)
    })

    return exitingArr
}

export function concatInfoData(result, info, bestRacers) {
    let dataArray = []

    info.map(object => {
        result.map(result => {
            if (object.id === result.id) {
                object = {...object, results: result.result}
                dataArray.push(object)
            }
        })
    })

    return dataArray
} 

export function sortDataByResult(data) {
    let sortedData = data.map(object => {
        return {...object, 
            sumResult: mathSumResult(object.results)}
    })
    sortedData.sort((prev, next) => prev.sumResult < next.sumResult ? 1 : -1)
    sortedData = findPlace(sortedData)

    return sortedData
}

export function parseResultArray(arr) {

    return arr.join(' | ')
}

function mathSumResult(results) {

    return results.reduce(function(a, b) {return a + b}) 
}

export function findPlace(data) {
    let counter = 0
    let dataWitchPlace = data.map( object => {
        counter++
        object = {...object,place: counter}

        return object
    })
    
    return dataWitchPlace
}

export function getTableElement() {
    const $table = document.querySelector('#table')
    return $table
}

export function getAppElement() {
    const $app = document.querySelector('#app')
    return $app
}

export function clearTemplate($app) {
    $app.innerHTML = ''
}




