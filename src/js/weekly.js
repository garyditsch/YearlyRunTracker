import { getWeek } from 'date-fns'

const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data"
const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"

const parseWeeklyData = (data) => {
    const months = data.reduce((acc, x) => {
        //get date
        const date = new Date(x.date)

        //get week
        const week = getWeek(date, {weekStartsOn: 1})
        
        //create key
        const year = `${date.getFullYear()}-${week}`

        //add key as property to return object
        if(!acc[year]){
            acc[year] = []
        }

        // push current data onto array
        acc[year].push(x)

        return acc        
    }, {})
    return months
}

const getWeeklyStats = (data) => {
    const result = data.map((x) => {
        const fortyfive = x[1].filter((y) => {
            // y.isFortyFive
            if(y.isFortyFive === true){
                return y
            }
            
        })
        const weekDuration = x[1].reduce((prev, curr) => {
            prev = prev + curr.runDuration
            return prev
        }, 0)
        const weekDistance = x[1].reduce((prev, curr) => {
            prev = prev + curr.value
            return prev
        }, 0)
        if(fortyfive.length > 3){
            return {
                'firstRunDate': x[1][0].date ? x[1][0].date : 'no run', 
                'week': x[0],
                'numberOfRuns': x[1].length,
                'weekDistance': weekDistance,
                'weekDuration': weekDuration,
                'fortyFiveSuccess': true,
                'runsOverFortyFive': fortyfive.length
            }
        } else {
            return {
                'firstRunDate': x[1][0].date ? x[1][0].date : 'no run', 
                'week': x[0],
                'numberOfRuns': x[1].length,
                'weekDistance': weekDistance,
                'weekDuration': weekDuration,
                'fortyFiveSuccess': false,
                'runsOverFortyFive': fortyfive.length
            }
        }
    })

    return result
}

const getWeeklyData = async (runTable, runTable2) => {
    const data = await getRunData(runTable)
    const data2 = await getRunData(runTable2)
    let afterTime = Date.now()

    const data3 = [...data, ...data2]
    const dates = await runDateValues(data3)

    const datesInOrder = dates.sort((a,b) => {
        return a.date - b.date
    })

    const weeks = await parseWeeklyData(datesInOrder)
    const entries = Object.entries(weeks);
    
    const results = getWeeklyStats(entries)
    console.log(results)
    return results
}


getWeeklyData(runTable, runTable2)
    .then(response => {
        const weeklyLabelsInChrono = response.map((x) => {return x.week})
        const weeklyDistanceArray = response.map((x) => {return parseFloat(x.weekDistance.toFixed(2))})
        // console.log(weeklyDistanceArray)
        const data = {
            labels: weeklyLabelsInChrono,
            datasets: [{
                label: 'Miles',
                backgroundColor: 'rgb(140, 192, 221)',
                borderColor: 'rgb(140, 192, 221)',
                data: weeklyDistanceArray,
            }]
        }
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
          };
        const myWeeklyChart = new Chart(
        document.getElementById('myWeeklyChart'),
        config
        );
    })
    .catch(err => console.log(err))

getWeeklyData(runTable, runTable2)
    .then(response => {
        const weeklyLabelsInChrono = response.map((x) => {return x.week})
        const weeklyFortyFiveArray = response.map((x) => {return x.runsOverFortyFive})
        console.log(weeklyFortyFiveArray)
        const data = {
            labels: weeklyLabelsInChrono,
            datasets: [{
                label: 'Success',
                backgroundColor: 'rgb(140, 192, 221)',
                borderColor: 'rgb(140, 192, 221)',
                data: weeklyFortyFiveArray,
            }]
        }
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, values) {
                                if(value == 4){
                                    return 'Success';
                                } else {
                                    return value
                                }
                            }
                        }
                    }
                }
              }
          };
        const myWeeklySuccessChart = new Chart(
        document.getElementById('myWeeklySuccessChart'),
        config
        );
    })
    .catch(err => console.log(err))



