async function calendar(theData, svg, ...Args){
    // hide an element

    const startDate = new Date(Args[0].startDate).getTime()
    const endDate = new Date(Args[0].endDate).getTime()
    const element = Args[0].class || 'no class'

    const hide = (elem) => {
        elem.classList.add('hidden');
    }

    let ed = new Date(endDate).getTime()
    let sd = new Date(startDate).getTime()

    let allMyDates = await theData(startDate, endDate)

    if(element != 'no class'){
        hide(document.querySelector(`.${element}`));
    }

    let dates = allMyDates.filter(d => {
        var time = new Date(d.date).getTime();
        return (sd < time && time < ed);
    });

    const yearTotal = dates.reduce((runTotal, run) => {
        const total = runTotal + run.value
        return total;
    }, 0)

    const yearData = {
        'total': yearTotal.toFixed(0), 
        'calYear': dates[0].date.getFullYear(), 
        'noRuns': dates.length
    }
    console.log('Year Data', yearData)

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

    console.log(svg)
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

export { calendar };