(function(window){
    function drawCharts(){
        let charts = {
            drawMilestone: milestone,
            drawBar: bar,
            drawCalendar: calendar,
            drawBubble: bubble
        }

        async function milestone(theData, getMilestones, svg, ...Args){
            const startDate = Args[0].startDate
            const endDate = Args[0].endDate
            const threshold = Args[0].threshold
            const margin = Args[0].margin
            const svgWidth = Args[0].svgWidth
            const svgHeight = Args[0].svgHeight

            const startMonth = new Date(startDate).getMonth()
            const endMonth = new Date(endDate).getMonth()
            const monthRange = d3.range(startMonth, (endMonth + 1), 1)

            const dates = await theData(startDate, endDate)
            const fiftyMiles = getMilestones(dates, threshold)

            const milestoneWidth = svgWidth - margin.left - margin.right

            const monthWidth = milestoneWidth / monthRange.length
            const monthPadding = 5

            const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            let x = d3.scaleLinear()
                .domain([new Date(startDate).getTime(), new Date(endDate).getTime()])
                .range([0, milestoneWidth])

            let monthX = d3.scaleLinear()
                .domain([startMonth, (endMonth + 1)])
                .range([0, milestoneWidth])

            svg
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .style('margin-top', margin.top)
                .style('margin-bottom', margin.bottom)
                .style('background', '#fff')

            svg
                .append("g")
                .selectAll("circle")
                .data(fiftyMiles)
                .enter()
                .append("circle")
                .attr('width', 5)
                .attr('height', 20)
                .attr('cx', (d, i) => x(new Date(d.date.date).getTime()) + margin.left)
                .attr('cy', 60)
                .attr('r', 10)
                .style('opacity', 0.4)
                .style('fill', "blue")

            svg
                .append("g")
                .append("line")
                .attr('stroke', 'blue')
                .attr('stroke-width', '2')
                .attr('x1', x(new Date(startDate).getTime()) + margin.left)
                .attr('x2', x(new Date(endDate).getTime()) + margin.left)
                .attr('y1', 60)
                .attr('y2', 60)

            svg
                .append("g")
                .selectAll('text')
                .data(fiftyMiles)
                .enter().append('text')
                .attr('x', (d, i) => x(new Date(d.date.date).getTime()) + margin.left)
                .attr('y', (d, i) => { if (i % 2 === 0) { return 15 } else { return 45 } })
                .attr('height', 45)
                .attr('width', 25)
                .text((d, i) => d.miles.toFixed(0))
                .style('fill', '#000')

            svg
                .append("g")
                .selectAll('line')
                .data(fiftyMiles)
                .enter().append('line')
                .attr('x1', (d, i) => x(new Date(d.date.date).getTime()) + margin.left)
                .attr('x2', (d, i) => x(new Date(d.date.date).getTime()) + margin.left)
                .attr('y1', (d, i) => { if (i % 2 === 0) { return 18 } else { return 48 } })
                .attr('y2', 60)
                .attr('stroke', 'blue')
                .attr('stroke-width', '2')

            svg
                .append("g")
                .selectAll('rect')
                .data(monthRange)
                .join("rect")
                .attr('x', (d) => monthX(d) + margin.left)
                .attr('width', monthWidth - monthPadding)
                .attr('height', 30)
                .attr('y', 85)
                .style('fill', "rgb(209, 227, 243)")


            svg
                .append("g")
                .selectAll('text')
                .data(monthRange)
                .enter().append('text')
                .attr('x', (d) => monthX(d) + margin.left + 10)
                .attr('y', 100)
                .attr('height', 20)
                .attr('width', 25)
                .text(d => monthLabels[d])
                .style('fill', '#000')

            // svg
            //     .append("g")
            //     .selectAll("rect")
            //     .data(fiftyMiles)
            //     .enter().append('rect')
            //     .attr('x', 0 + margin.left)
            //     .attr('y', (d, i) => (40 * i) + 125)
            //     .attr('height', 30)
            //     .attr('width', milestoneWidth)
            //     .style('fill', "rgb(241, 247, 253)")

            // svg
            //     .append("g")
            //     .selectAll('text')
            //     .data(fiftyMiles)
            //     .enter().append('text')
            //     .attr('x', 5 + margin.left)
            //     .attr('y', (d, i) => (40 * i) + 145)
            //     .attr('height', 45)
            //     .attr('width', milestoneWidth)
            //     .text((d, i) => `${i + 1} //  Date: ${d.date.date.toLocaleDateString(
            //         'en-US',
            //         {
            //             year: 'numeric',
            //             month: 'long',
            //             day: 'numeric'
            //         }
            //     )}  // Total Miles: ${d.miles.toFixed(0)}`)
            //     .style('fill', '#000')
        }

        async function bar(theData, svg, ...Args){
            const startDate = new Date(Args[0].startDate).getTime()
            const endDate = new Date(Args[0].endDate).getTime()
            

            const dates = await theData(startDate, endDate)

            const height = Args[0].height
            const width = Args[0].width
            const margin = Args[0].margin

            //  the size of the overall svg element
            // const margin = { top: 10, right: 20, bottom: 35, left: 0 };
            const widthBar = width - margin.left - margin.right;
            const heightBar = height - margin.top - margin.bottom;

            const topRunList = dates.sort((a, b) => { return b.value - a.value }).slice(0, 10)
            const formatDate = d3.utcFormat("%x");

            const xScale = d3.scaleLinear()
                .domain([0, d3.max(topRunList, d => d.value)])
                .range([0, widthBar])

            const yScale = d3.scaleBand()
                .domain(topRunList.map(d => d.date))
                .range([0, heightBar])
                .padding(0.05)

            svg
                .attr('width', widthBar + margin.left + margin.right)
                .attr('height', heightBar + margin.top + margin.bottom)
                .style('margin-top', margin.top)
                .style('background', '#fff')
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            svg
                .append('g')
                .selectAll('rect')
                .data(topRunList)
                .enter().append('rect')
                .style('fill', 'rgb(83, 157, 204)')
                .style('stroke', '#000')
                .style('stroke-width', '0')
                .attr('height', yScale.bandwidth)
                .attr('width', (topRunList) => xScale(topRunList.value))
                .attr('y', topRunList => yScale(topRunList.date))
                .attr('x', 0 + margin.left)


            svg
                .append('g')
                .selectAll('text')
                .data(topRunList)
                .enter().append('text')
                .attr('height', yScale.bandwidth)
                .attr('width', (topRunList) => xScale(topRunList.value))
                .attr('y', topRunList => yScale(topRunList.date) + margin.top + 10)
                .attr('x', 0 + margin.left + 10)
                .text(d => `${formatDate(d.date)}` + `, ` + `${d.value.toFixed(2)} miles`)
                .style('fill', "#fff")
        }

        async function calendar(theData, svg, ...Args){

            const startDate = new Date(Args[0].startDate).getTime()
            const endDate = new Date(Args[0].endDate).getTime()

            const dates = await theData(startDate, endDate)
            // console.log(dates)

            const yearTotal = dates.reduce((runTotal, run) => {
                const total = runTotal + run.value
                return total;
            }, 0)

            const yearData = {
                'total': yearTotal.toFixed(0), 
                'calYear': dates[0].date.getFullYear(), 
                'noRuns': dates.length
            }

            // function to return week label
            const formatDay = d =>
                ["Sun", "", "Tue", "", "Thu", "", "Sat"][d.getUTCDay()];
            
            // return an index representing day of week: Ex: 0 = Sunday, 6 = Saturday
            const countDay = d => d.getUTCDay();

            // had to reduce the dates to get totals for each day
            // https://stackoverflow.com/questions/47893084/sum-the-values-for-the-same-dates
            // had some issues with the dates as objects, but changing to string and comparing worked
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
            const reducedDates = dates.reduce(function (allDates, date) {
                if (allDates.some(function (e) {
                    return e.date.toLocaleString('en-US') === date.date.toLocaleString('en-US')
                })) {
                    allDates.filter(function (e) {
                        return e.date.toLocaleString('en-US') === date.date.toLocaleString('en-US')
                    })[0].value += +date.value
                } else {
                    allDates.push({
                        date: date.date,
                        value: +date.value
                    })
                }
                return allDates
            }, []);

        
            // return array with months grouped together. NOTE: nest is deprecated in future d3 versions
            const months = d3.nest()
                .key(d => d.date.toLocaleString('default', { month: 'short' }))
                .entries(reducedDates)

            months.sort((a, b) => (a.values[0].date > b.values[0].date ) ? 1 : ((b.values[0].date > a.values[0].date) ? -1 : 0))

            const month_totals = months.map((month) => {
                if (month.key === 'Jan'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Jan', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Feb'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Feb', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Mar'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Mar', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Apr'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Apr', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'May'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'May', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Jun'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Jun', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Jul'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Jul', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Aug'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Aug', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Sep'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Sep', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Aug'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Aug', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Oct'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Oct', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Nov'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Nov', 'total': d3.sum(allValue).toFixed(2)}
                } else if (month.key === 'Dec'){
                    const allValue = []
                    month.values.map((v) => allValue.push(v.value))
                    return {'key': 'Dec', 'total': d3.sum(allValue).toFixed(2)}
                }
            })
        
            // get array of all values
            const values = reducedDates.map(c => c.value);

            // get max/min values 
            const maxValue = d3.max(values);
            const minValue = d3.min(values);
        
            // set constants, yearHeight is * 7 for days of week
            const cellSize = 10;
            const yearHeight = cellSize * 5 + 25;

            // https://www.geeksforgeeks.org/d3-js-d3-utcsunday-function/
            // returns array of all the sundays from a start/end date
            const timeWeek = d3.utcSunday;
            const formatDate = d3.utcFormat("%x");

            // adds day of the week
            svg.append('g')
                .attr("text-anchor", "end")
                .selectAll("text")
                .data(d3.range(7).map(i => new Date(1995, 0, i)))
                .join("text")
                .attr("x", 20)
                .attr("y", d => ((countDay(d) + 0.5) * cellSize) + 50)
                .attr("dy", "0.31em")
                .attr("font-size", 10)
                .text(formatDay);

            // console.log(yearData)
            // add year totals
            svg
                .append("text")
                .attr('x', 0)
                .attr('y', 10)
                .attr('height', 45)
                .attr('width', 500)
                .attr('font-size', 12)
                .text(`${yearData.calYear} | Total Miles: ${yearData.total}, Total Runs: ${yearData.noRuns}`)

            // adds month label
            svg
                .append("g")
                .selectAll('text')
                .data(months)
                .enter().append('text')
                .attr('x', (d, i) => (yearHeight * i + cellSize * 1.5) + 10 )
                .attr('y', 30)
                .attr('height', 45)
                .attr('width', 50)
                .attr('font-size', 12)
                .text(d => { return d.key })
                .style('fill', '#000')

            svg
                .append("g")
                .selectAll('text')
                .data(month_totals)
                .enter().append('text')
                .attr('x', (d, i) => (yearHeight * i + cellSize * 1.5) + 10 )
                .attr('y', 40)
                .attr('height', 15)
                .attr('width', 50)
                .attr("font-size", 10)
                .text(d => { return `${d.total} mi` })
                .style('fill', '#000000')
        
            // adding g element to svg
            const group = svg.append("g")
        
            // adds g element for each month with data to svg
            // gives the y axis value to move g element based on month index within data
            const month = group
                .selectAll("g")
                .data(months)
                .join("g")
                .attr(
                    "transform",
                    (d, i) => `translate(${yearHeight * i + cellSize * 1.5}, 0)`
                );
        
        
            // http://using-d3js.com/04_05_sequential_scales.html
            const colorFn = d3
                    .scaleSequential(d3.interpolateBlues)
                    // .scaleSequential(d3.interpolateCool)
                    .domain([Math.floor(minValue), Math.ceil(maxValue)]);
            const format = d3.format("+.2%");
        
            month
                .append("g")
                .selectAll("rect")
                .data(d => d.values)
                .join("rect")
                .attr("width", cellSize - 1.5)
                .attr("height", cellSize - 1.5)
                .attr(
                    "x",
                    (d, i) => timeWeek.count(d3.utcMonth(d.date), d.date) * cellSize + 10
                )
                .attr("y", d => (countDay(d.date) * cellSize + 0.5) + 50)
                .attr("fill", d => colorFn(d.value))
                .append("title")
                    .text(d => `${formatDate(d.date)}: ${d.value.toFixed(2)}`);
                    
        }

        async function bubble(theData, svg, ...Args){
            const startDate = new Date(Args[0].startDate).getTime()
            const endDate = new Date(Args[0].endDate).getTime()
            const dates = await theData(startDate, endDate)
            const width = 600 - 100
            const height = 400

            var x = d3.scaleLinear()
                .domain([0, 24])
                .range([ 0, width ])

            var y = d3.scaleLinear()
                .domain([0, 13])
                .range([ height, 0]);

            var z = d3.scaleLinear()
                .domain([d3.min(dates, d => d.speed), d3.max(dates, d => d.speed)])
                .range([3, 9]);

            const radiusArray = dates.map((d) => {
                 return parseInt(z(d.speed))
            })

            const uniqueArray = [...new Set(radiusArray)].sort()

            const speedArray = uniqueArray.map((num) => {
                return z.invert(num).toFixed(2)
            })
  
            svg.append("g")
                .attr("transform", "translate(50," + height + ")")
                .call(d3.axisBottom(x));

            svg.append("g")
                .attr("transform", "translate(50, 0)")
                .call(d3.axisLeft(y));

            // Add dots
            svg.append('g')
            .selectAll("circle")
            .data(dates)
            .enter()
            .append("circle")
                .attr("cx", function (d) { return x(d.minutesOfDayStart) + 50; } )
                .attr("cy", function (d) { return y(d.value); } )
                .attr("r", function (d) { return  z(d.speed).toFixed(0); } )
                .style("fill", "#69b3a2")
                .style("opacity", "0.7")

            //Create X axis label   
            svg.append("text")
            .attr("x", width / 2 )
            .attr("y",  y(0) + 40 )
            .style("text-anchor", "middle")
            .text("Time of Day");

            //Create Y axis label
            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", x(0) + 10 )
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Distance"); 

            svg.append('g')
            .selectAll("circle")
            .data(uniqueArray)
            .enter()
            .append("circle")
                .style("fill", "#69b3a2")
                .attr("r", function (d) { return d})
                .attr(
                    "transform", 
                    (d, i) => `translate(570, ${i * 25 + 10})`
                )

            svg.append('g')
            .selectAll("text")
            .data(speedArray)
            .enter()
            .append("text")
                .attr(
                    "transform", 
                    (d, i) => `translate(590, ${i * 25 + 15})`
                )
            .text((d, i) => `${d} min/mile`)
            .style("fill", "#69b3a2")
        }

        return charts;
    }

    if(typeof window.RunCharts === 'undefined'){
        window.RunCharts = drawCharts();
    }

})(window);

export default RunCharts;
