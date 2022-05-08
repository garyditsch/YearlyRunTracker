import { calendar } from "./calendar.js"

// const runTable2 = "https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data"

const drawCalendar2019 = () =>{
    const svg = d3.select("#calendar_svg_2019")

    calendar(theData, runTable2, svg, {
        'startDate': '1/1/2019',
        'endDate': '12/31/2019',
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
}

const drawCalendar2018 = () =>{
    const svg = d3.select("#calendar_svg_2018")

    calendar(theData, runTable2, svg, {
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
        'class': 'spinner3'
    });
}

const drawCalendar2017 = () =>{
    const svg = d3.select("#calendar_svg_2017")

    calendar(theData, runTable2, svg, {
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
        'class': 'spinner3'
    });
}


export { drawCalendar2019, drawCalendar2018, drawCalendar2017 }