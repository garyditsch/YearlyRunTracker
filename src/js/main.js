import { calendar } from "./modules/calendar.js"
import { drawCalendar2018, drawCalendar2019, drawCalendar2017 } from "./modules/helpers.js"

const calendar_svg = d3.select("#calendar_svg_2022")

const runTable = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data"
const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"
let dateControl = document.querySelector('select');


dateControl.addEventListener('change', async () => {
    console.log(dateControl.value)
    switch(dateControl.value){
        case '2022':
            calendar(theData, runTable, calendar_svg, {
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
            calendar(theData, runTable, calendar_svg, {
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
            calendar(theData, runTable, calendar_svg, {
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
            calendar(theData, runTable2, calendar_svg, {
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
            calendar(theData, runTable2, calendar_svg, {
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
            calendar(theData, runTable2, calendar_svg, {
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
})