import { ru } from "date-fns/locale";
import { calendar } from "./modules/calendar.js"
import { theData, runTable, runTable2 } from './modules/data'

const calendar_svg = d3.select("#calendar_svg_2022")
const comparison_cal = d3.select("#comparison_year")
let dateControl = document.querySelector('select');

const totalToDate = (myData) => {
    console.log(myData)
    const total = myData.reduce((acc, curr) => {
        //get day of year for today
        let today = new Date()
        let year = today.getFullYear()
        let start = new Date(today.getFullYear(), 0, 0)
        let diff = (today - start) + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 100)
        let oneDay = 1000 * 60 * 60 * 24
        let dayOfYear = Math.floor(diff / oneDay)

        if((curr.dayOfYear <= dayOfYear) && curr.year == year){
            acc += curr.value
        }

        return acc        
    }, 0)
    return total
}

const getYearlyTotal = async () => {
    if(localStorage.getItem('runData')){
    const myData = JSON.parse(localStorage.getItem('runData'))
    console.log(myData)
    const total = totalToDate(myData)
    console.log(total.toFixed(0))
    } else {
        console.log('sorry no data')
    }
    
}

const thisData = getYearlyTotal()


const drawYearlyCalender = async () => {
    console.log(dateControl.value)
    switch(dateControl.value){
        case '2022':
            calendar(theData, runTable, runTable2, calendar_svg, {
                'startDate': '12/31/2021',
                'endDate': '1/1/2023',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            break;
        case '2021':
            console.log('first')
            calendar(theData, runTable, runTable2, calendar_svg, {
                'startDate': '12/31/2021',
                'endDate': '1/1/2023',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            console.log('second')
            calendar(theData, runTable, runTable2, comparison_cal, {
                'startDate': '12/31/2020',
                'endDate': '1/1/2022',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            break;
        case '2020':
            calendar(theData, runTable, runTable2, calendar_svg, {
                'startDate': '12/31/2019',
                'endDate': '1/1/2021',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            break;
        case '2019':
            calendar(theData, runTable, runTable2, calendar_svg, {
                'startDate': '12/31/2018',
                'endDate': '1/1/2020',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            break;
        case '2018':
            calendar(theData, runTable, runTable2, calendar_svg, {
                'startDate': '12/31/2017',
                'endDate': '1/1/2019',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            break;
        case '2017':
            calendar(theData, runTable, runTable2, calendar_svg, {
                'startDate': '12/31/2016',
                'endDate': '1/1/2018',
                'height': 500,
                'width': 900,
                'margin': {
                    left: 0,
                    right: 10,
                    top: 100,
                    bottom: 10
                }, 
            })
            break;
        // default:
        //     console.log("Score value is neither 10 or 20");
    }
}


dateControl.addEventListener('change', async () => {
    drawYearlyCalender(theData, runTable, runTable2 )
})