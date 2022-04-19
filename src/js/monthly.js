const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data"
const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"

const getMonthlyGroupedData = async (runTable, runTable2, isSorted) => {
    const result = await groupedMonthlyData(runTable, runTable2, isSorted)
    const monthValues = await result.map((x) => {return x.distance})
    const monthLabels = await result.map((x) => {return x.key})
    const monthRunCount = await result.map((x) => {return x.runCount})
    return {
        'monthLabels': monthLabels,
        'monthValues': monthValues,
        'monthRunCount': monthRunCount
    }
}

getMonthlyGroupedData(runTable, runTable2, true)
    .then(response => {
        console.log(response.monthValues)
        const data = {
            labels: response.monthLabels,
            datasets: [{
                label: 'Miles',
                backgroundColor: 'rgb(140, 192, 221)',
                borderColor: 'rgb(140, 192, 221)',
                data: response.monthValues,
            }]
        }
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
          };
        const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );
    })
    .catch(err => console.log(err))

getMonthlyGroupedData(runTable, runTable2, false)
    .then(response => {
        const data = {
            labels: response.monthLabels,
            datasets: [{
                label: 'Miles',
                backgroundColor: 'rgb(140, 192, 221)',
                borderColor: 'rgb(140, 192, 221)',
                data: response.monthValues,
            }]
        }
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
          };
        const myChart = new Chart(
        document.getElementById('dateMonthlyChart'),
        config
        );
    })
    .catch(err => console.log(err))

getMonthlyGroupedData(runTable, runTable2, false)
    .then(response => {
        const data = {
            labels: response.monthLabels,
            datasets: [{
                label: 'Run Count',
                backgroundColor: 'rgb(140, 192, 221)',
                borderColor: 'rgb(140, 192, 221)',
                data: response.monthRunCount,
            }]
        }
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
          };
        const myChart = new Chart(
        document.getElementById('runCountDateMonthlyChart'),
        config
        );
    })
    .catch(err => console.log(err))

getMonthlyGroupedData(runTable, runTable2, true)
    .then(response => {
        const data = {
            labels: response.monthLabels,
            datasets: [{
                label: 'Run Count',
                backgroundColor: 'rgb(140, 192, 221)',
                borderColor: 'rgb(140, 192, 221)',
                data: response.monthRunCount,
            }]
        }
        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }
          };
        const myChart = new Chart(
        document.getElementById('runCountHighToLow'),
        config
        );
    })
    .catch(err => console.log(err))
