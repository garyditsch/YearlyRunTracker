const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data"
const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"

// Fetch the data from the Airtable via Netlify function
const getRunData = async (url) => {
    try {
        const res = await fetch(url);
        return res.json()
    } catch (err) {
        console.log('get data error', err)
    } finally {
        console.log('get data has finished')
    }
}

// map over the data and return a new array with just the formatted date and distance of the commute
// this format was utilized by the example I worked from would like to improve with additional data
// convert from km to miles
// TODO: bring in other data for additional data sources
const runDateValues = async (data) =>  data.map((dv) => {

    return {
        date: d3.timeDay(new Date(dv['Activity Date'])),
        value: (Number(dv['Distance']) * 0.6213712),
        minutesOfDayStart: (((new Date(dv['Activity Date']).getHours() * 60) + (new Date(dv['Activity Date']).getMinutes()) - new Date(dv['Activity Date']).getTimezoneOffset()) / 60 ),
        speed: 60 / (dv["Average Speed"] * 2.2369),
        runDuration: (dv['Elapsed Time'] / 60),
        isFortyFive: 45 <= (dv['Elapsed Time'] / 60),
        dv: dv,
    }}
);


const theData = async (table, table2) => {
    const thisWeek = new Date(Date.now())
    const today = thisWeek.setHours(0, 0, 0, 0)
    console.log(typeof(today), 'today variable')
    console.log(typeof(JSON.parse(localStorage.getItem('updatedData'))))

    try {
        if (localStorage.getItem("runData") === null) {
            const data1 = await getRunData(table)
            const data2 = await getRunData(table2)
            console.log('hit the api endpoint')
            const data3 = [...data1, ...data2]
            const dates = await runDateValues(data3)

            const datesInOrder = dates.sort((a,b) => {
                return a.date - b.date
            })

            localStorage.setItem("runData", JSON.stringify(datesInOrder))
            localStorage.setItem("updatedData", JSON.stringify(today))
            console.log('the api dates because of no storage', dates)
            return dates
        } else if (today !== JSON.parse(localStorage.getItem('updatedData'))) {
            const data1 = await getRunData(table)
            const data2 = await getRunData(table2)
            console.log('hit the api endpoint')
            const data3 = [...data1, ...data2]
            const dates = await runDateValues(data3)

            const datesInOrder = dates.sort((a,b) => {
                return a.date - b.date
            })

            localStorage.setItem("runData", JSON.stringify(datesInOrder))
            localStorage.setItem("updatedData", JSON.stringify(today))
            console.log('the api dates becaue of past date', dates)
            return dates
        } else {
            const dates = JSON.parse(localStorage.getItem("runData"))
            console.log('the local storage dates', dates)
            return dates
        }
    } catch (err) {
        console.log('the data function error', err)
    } finally {
        console.log('done with the data function')
    }
}

export { getRunData, runDateValues, theData, runTable, runTable2 }

