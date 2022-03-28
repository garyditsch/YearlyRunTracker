import { calendar } from "./modules/calendar.js"
import { drawCalendar2018, drawCalendar2019, drawCalendar2017 } from "./modules/helpers.js"

const calendar_svg_2022 = d3.select("#calendar_svg_2022")
const calendar_svg_2021 = d3.select("#calendar_svg_2021")
const calendar_svg_2020 = d3.select("#calendar_svg_2020")

document.querySelector('#button_2019').addEventListener('click', drawCalendar2019)
document.querySelector('#button_2018').addEventListener('click', drawCalendar2018)
document.querySelector('#button_2017').addEventListener('click', drawCalendar2017)

const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data"
const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"

calendar(theData, runTable, calendar_svg_2022, {
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
    'class': 'spinner1'
});

calendar(theData, runTable, calendar_svg_2021, {
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
    'class': 'spinner2'
});


calendar(theData, runTable, calendar_svg_2020, {
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
    'class': 'spinner3'
});

const getMonthlyGroupedData = async (runTable, runTable2) => {
    const result = await groupedMonthlyData(runTable, runTable2)
    const monthly = document.getElementById('monthlyReview')
    const list = result.map((month) => {
        return `<div>${month.key}:  ${month.distance}</div>`
    })
    monthly.innerHTML = list.join('')
}

getMonthlyGroupedData(runTable, runTable2)