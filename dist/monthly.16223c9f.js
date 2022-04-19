// Fetch the data from the csv file
const getRunData = async (url, offset)=>{
    try {
        const res = await fetch(url);
        return res.json();
    } catch (err) {
        console.log('get data error', err);
    } finally{
        console.log('get data has finished');
    }
};
// map over the data and return a new array with just the formatted date and distance of the commute
// this format was utilized by the example I worked from would like to improve with additional data
// convert from km to miles
// TODO: bring in other data for additional data sources
const runDateValues = async (data)=>data.map((dv)=>{
        return {
            date: d3.timeDay(new Date(dv['Activity Date'])),
            value: Number(dv['Distance']) * 0.6213712,
            minutesOfDayStart: (new Date(dv['Activity Date']).getHours() * 60 + new Date(dv['Activity Date']).getMinutes() - new Date(dv['Activity Date']).getTimezoneOffset()) / 60,
            speed: 60 / (dv["Average Speed"] * 2.2369),
            runDuration: dv['Elapsed Time'] / 60,
            isFortyFive: 45 <= dv['Elapsed Time'] / 60,
            dv: dv
        };
    })
;
const theData = async (table)=>{
    try {
        let beforeTime = Date.now();
        const data = await getRunData(table);
        let afterTime = Date.now();
        const dates = await runDateValues(data);
        return dates;
    } catch (err) {
        console.log('the data function error', err);
    } finally{
        console.log('done with the data function');
    }
};
const groupedMonthlyData = async (table1, table2, sorted = true)=>{
    try {
        let beforeTime = Date.now();
        const data = await getRunData(table1);
        const data2 = await getRunData(table2);
        let afterTime = Date.now();
        const data3 = [
            ...data,
            ...data2
        ];
        const dates = await runDateValues(data3);
        console.log(dates);
        const datesInOrder = dates.sort((a, b)=>{
            return a.date - b.date;
        });
        const months = d3.nest().key((d)=>d.date.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
            })
        ).entries(datesInOrder);
        const monthTotals = months.map((month)=>{
            const subTotal = month.values.reduce((total, num)=>{
                return total + num.value;
            }, 0);
            return {
                key: month.key,
                distance: parseInt(subTotal),
                runCount: month.values.length
            };
        });
        if (sorted === true) {
            const sortedMonthTotal = monthTotals.sort((a, b)=>{
                return b.distance - a.distance;
            });
            console.log(sortedMonthTotal);
            return sortedMonthTotal;
        }
        console.log(monthTotals);
        return monthTotals;
    } catch (err) {
        console.log('the data function error', err);
    } finally{
        console.log('done with the data function');
    }
};

//# sourceMappingURL=monthly.16223c9f.js.map
