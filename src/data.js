import { sortResult, concatInfoData, sortDataByResult, findPlace } from "./utils"

export let data = []

export async function initData() {
    try {
        let response = await fetch('http://localhost:8888/SM/?results=results')
        const responseResults = await response.json()
        const result = sortResult(responseResults)
        response = await fetch('http://localhost:8888/SM/?info=info')
        const responseInfo = await response.json()
        const info = Object.values(responseInfo)
        setData(sortDataByResult(concatInfoData(result, info)), bestRaces(result, info)) 

        return data
    } catch (error) {
        console.error('Упс... Что-то пошло не так...' + error);
    }
}

function setData(objects, bestRacers) {
    data = {mainList: objects, bestRacersList: bestRacers, defaultList: objects }
    
    return data
}

function bestRaces(resultArr, info) {
    let bestRacers = {bestRacers: [], bestRacersByRace: []}
    
    for (let i = 0; i < resultArr[0].result.length; i++) {
        let array = []
        
        resultArr.map( obj => {
            array.push({id: obj.id, result: obj.result[i], race: i + 1})
        })

        array.sort((prev, next) => prev.result < next.result ? 1 : -1)
        
        bestRacers.bestRacersByRace.push(array)

        info.map(racer => {
            if (array[0].id === racer.id) {
                bestRacers.bestRacers.push({...array[0],name: racer.name, city: racer.city, car: racer.car})
            }
        })
    }  

    bestRacers.bestRacersByRace = bestRacers.bestRacersByRace.map( array => {
        
        array = array.map( object => {
            info.map( objInfo => {
                if (object.id === objInfo.id) {
                    object = {...object,name: objInfo.name, city: objInfo.city, car: objInfo.car}
                }
            })

            return object
        })
        array = findPlace(array)

        return array
    })

    return bestRacers
}

export function mutationDataWithId(id) {
    let index = id - 1
    data.mainList = data.bestRacersList.bestRacersByRace[index]
}

export function resetTable() {
    data.mainList = data.defaultList
}
