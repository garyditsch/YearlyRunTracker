// Fetch the data from the csv file
const getRunData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data
    } catch (err) {
        console.log('get data error', err)
    } finally {
        console.log('get data has finished')
    }
}

// Where I save the csv data
const running_csv = "https://gist.githubusercontent.com/garyditsch/32a199bea63e2f51ca3fc850f3b5914f/raw/strava_all_activities.csv"


// map over the data and return a new array with just the formatted date and distance of the commute
// this format was utilized by the example I worked from would like to improve with additional data
// convert from km to miles
// TODO: bring in other data for additional data sources
const runDateValues = async (data) => data.map(dv => ({
    date: d3.timeDay(new Date(dv['Activity Date'])),
    value: (Number(dv['Distance']) * 0.6213712)/1000,
    minutesOfDayStart: (((new Date(dv['Activity Date']).getHours() * 60) + (new Date(dv['Activity Date']).getMinutes()) - new Date(dv['Activity Date']).getTimezoneOffset()) / 60 ),
    speed: 60 / (dv["Average Speed"] * 2.2369),
    dv: dv,
}));

const theData = async (startDate, endDate) => {
    try {
        const data = await getRunData(running_csv)
        const parsedData = d3.csvParse(data);
        const dates = await runDateValues(parsedData)
        // console.log(dates)

        ed = new Date(endDate).getTime(),
        sd = new Date(startDate).getTime(),
        result = dates.filter(d => {
            var time = new Date(d.date).getTime();
            return (sd < time && time < ed);
        });
        console.log(result)
        return result
    } catch (err) {
        console.log('the data function error', err)
    } finally {
        console.log('done with the data function')
    }
}