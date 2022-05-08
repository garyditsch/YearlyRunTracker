import { theData, runTable, runTable2 } from './modules/data'

const groupedMonthlyData = async (sorted = true) => {
  try {
      const dates = await theData(runTable, runTable2)

      console.log(typeof(dates[0].date))

      const months = d3.nest()
          .key(d => new Date(d.date).toLocaleString('default', { month: 'long', year: 'numeric' }))
          .entries(dates)

      console.log(months)

      const monthTotals = months.map((month) => {
          const subTotal = month.values.reduce((total, num) => { 
              return total + num.value              
          }, 0)
          return {
              key: month.key,
              distance: parseInt(subTotal),
              runCount: month.values.length
          }
      })
      if( sorted === true){
          const sortedMonthTotal = monthTotals.sort((a, b) => {
              return b.distance - a.distance
          })
          // console.log(sortedMonthTotal)
          return sortedMonthTotal
      }
      // console.log(monthTotals)
      return monthTotals        
  } catch (err) {
      console.log('the data function error', err)
  } finally {
      console.log('done with the data function')
  }
}

const getMonthlyGroupedData = async (isSorted) => {
    const result = await groupedMonthlyData(isSorted)
    const monthValues = await result.map((x) => {return x.distance})
    const monthLabels = await result.map((x) => {return x.key})
    const monthRunCount = await result.map((x) => {return x.runCount})
    return {
        'monthLabels': monthLabels,
        'monthValues': monthValues,
        'monthRunCount': monthRunCount
    }
}

getMonthlyGroupedData(true)
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

getMonthlyGroupedData(false)
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

getMonthlyGroupedData(false)
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

getMonthlyGroupedData(true)
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
