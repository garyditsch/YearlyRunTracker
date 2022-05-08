import { getWeek } from 'date-fns'
import { theData, runTable, runTable2 } from './modules/data'

const thisWeek = new Date(Date.now())        
const week = getWeek(thisWeek, {weekStartsOn: 1})
const year = `${thisWeek.getFullYear()}-${week}`

const parseWeeklyData = (data) => {
    const months = data.reduce((acc, x) => {
        //get date
        const date = new Date(x.date)
        // console.log(date)

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

const getWeeklyData = async () => {
    const dates = await theData(runTable, runTable2)

    const weeks = await parseWeeklyData(dates)
    const entries = Object.entries(weeks);
    
    const results = getWeeklyStats(entries)
    console.log(results)
    return results
}

getWeeklyData()
    .then(response => {
        const finalWeek = response[response.length -1]
        console.log('final response', finalWeek)

        if(finalWeek.week === year){
            const idWeek = document.getElementById('theWeekId')
            idWeek.innerHTML = finalWeek.week
            const runWeek = document.getElementById('theWeekRuns')
            runWeek.innerHTML = finalWeek.numberOfRuns
            const distanceWeek = document.getElementById('theWeekDistance')
            distanceWeek.innerHTML = finalWeek.weekDistance.toFixed(2)
            const fortyFiveWeek = document.getElementById('theWeekFortyFive')
            fortyFiveWeek.innerHTML = finalWeek.runsOverFortyFive
        } else {
            const idWeek = document.getElementById('theWeekId')
            idWeek.innerHTML = year
            const runWeek = document.getElementById('theWeekRuns')
            runWeek.innerHTML = '0'
            const distanceWeek = document.getElementById('theWeekDistance')
            distanceWeek.innerHTML = '0'
            const fortyFiveWeek = document.getElementById('theWeekFortyFive')
            fortyFiveWeek.innerHTML = '0'
        }
    })

getWeeklyData()
    .then(response => {
        const lastWeek = response[response.length - 1]

        if(lastWeek.week === year){
            var lastEightWeeks = response.slice((response.length - 8))
        } else {
            const thisWeekData = {
                firstRunDate: 'none',
                fortyFiveSuccess: false,
                runsOverFortyFive: 0,
                week: year,
                weekDistance: 0,
                weekDuration: 0
            }

            var lastEightWeeks = response.slice((response.length - 7))
            lastEightWeeks.push(thisWeekData)
        }

        const margin = { top: 30, right: 30, bottom: 70, left: 100 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        console.log(year);

        // append the svg object to the body of the page
        const svg = d3
            .select("#fortyfive_bar")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // y axis range
        let yScale = d3
            .scaleBand()
            .range([height, 0])
            .padding(0.2);
        
        // set y axis range to data
        yScale
            .domain(
            lastEightWeeks.map(function (d) {
                return d.week;
            })
            )

        // X axis
        let xScale = d3
            .scaleLinear()
            .range([0, width])
        
        // set x axis range to data
        xScale
            .domain([0,7])
        
        // Bars
        
        svg
            .selectAll('mybars')
            .data(lastEightWeeks)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', function (d) {
            return yScale(d.week)
            })
            .attr('width', function (d) {
            return xScale(d.runsOverFortyFive)
            })
            .attr('height', yScale.bandwidth())
            .attr("fill", function (d) {
                if (d.week === year) {
                return "#09468B";
                } else if (d.runsOverFortyFive > 3) {
                return "#ACAD94";
                } else {
                return "#D8D4D5";
                }
            })
        
        svg
            .append('line')
            .style('stroke', '#ACAD94')
            .style('stroke-width', 1)
            .attr('x1', 383)
            .attr('x2', 383)
            .attr('y1', 0)
            .attr('y2', 300) 
        
        let xAxisGenerator = d3.axisBottom(xScale).ticks(7)
        
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisGenerator)
            .selectAll("text")
            .attr("transform", "translate(3,0)rotate(0)")
            .attr("font-size", "0.8rem")
            .style("text-anchor", "end");

        let yAxisGenerator = d3.axisLeft(yScale).ticks(7);

        svg
            .append("g")
            .call(yAxisGenerator)
            .selectAll("text")
            .attr("font-size", "0.8rem");
})


getWeeklyData()
    .then(response => {
        const weeklyLabelsInChrono = response.map((x) => {return x.week})
        const weeklyDistanceArray = response.map((x) => {return parseFloat(x.weekDistance.toFixed(2))})

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

getWeeklyData()
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



