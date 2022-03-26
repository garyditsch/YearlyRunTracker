import { calendar } from "./modules/calendar.js"
import { drawCalendar } from "./modules/helpers.js"

const calendar_svg_2022 = d3.select("#calendar_svg_2022")
const calendar_svg_2021 = d3.select("#calendar_svg_2021")
const calendar_svg_2020 = d3.select("#calendar_svg_2020")
// const calendar_svg_2019 = d3.select("#calendar_svg_2019")
const calendar_svg_2018 = d3.select("#calendar_svg_2018")
const calendar_svg_2017 = d3.select("#calendar_svg_2017")

document.querySelector('#button_2019').addEventListener('click', drawCalendar)

calendar(theData, calendar_svg_2022, {
    'startDate': '1/1/2022',
    'endDate': '12/31/2022',
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

calendar(theData, calendar_svg_2021, {
    'startDate': '1/1/2021',
    'endDate': '12/31/2021',
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


calendar(theData, calendar_svg_2020, {
    'startDate': '1/1/2020',
    'endDate': '12/31/2020',
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


// calendar(theData, calendar_svg_2018, {
//     'startDate': '1/1/2018',
//     'endDate': '12/31/2018',
//     'height': 500,
//     'width': 900,
//     'margin': {
//         left: 0,
//         right: 10,
//         top: 100,
//         bottom: 10
//     }
// });

// calendar(theData, calendar_svg_2017, {
//     'startDate': '1/1/2017',
//     'endDate': '12/31/2017',
//     'height': 500,
//     'width': 900,
//     'margin': {
//         left: 0,
//         right: 10,
//         top: 100,
//         bottom: 10
//     }
// });
