// Fetch the data from the csv file
const getRunData = async (url, offset) => {
    try {
        const res = await fetch(url);
        return res.json()
    } catch (err) {
        console.log('get data error', err)
    } finally {
        console.log('get data has finished')
    }
}

// const runTable = "http://localhost:8888/api/get-run-data"

const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data"

// map over the data and return a new array with just the formatted date and distance of the commute
// this format was utilized by the example I worked from would like to improve with additional data
// convert from km to miles
// TODO: bring in other data for additional data sources
const runDateValues = async (data) => data.map(dv => ({
    date: d3.timeDay(new Date(dv['Activity Date'])),
    value: (Number(dv['Distance']) * 0.6213712),
    minutesOfDayStart: (((new Date(dv['Activity Date']).getHours() * 60) + (new Date(dv['Activity Date']).getMinutes()) - new Date(dv['Activity Date']).getTimezoneOffset()) / 60 ),
    speed: 60 / (dv["Average Speed"] * 2.2369),
    dv: dv,
}));


const theData = async () => {
    try {
        let beforeTime = Date.now()
        const data = await getRunData(runTable)
        let afterTime = Date.now()
        
        const dates = await runDateValues(data)

        console.log('data load ok executed in', (afterTime - beforeTime) / 1000)
        
        return dates
    } catch (err) {
        console.log('the data function error', err)
    } finally {
        console.log('done with the data function')
    }
}