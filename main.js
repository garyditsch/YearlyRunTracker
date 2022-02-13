import RunCharts from "./chart.js";

const calendar_svg_2022 = d3.select("#calendar_svg_2022")
const calendar_svg_2021 = d3.select("#calendar_svg_2021")
const calendar_svg_2020 = d3.select("#calendar_svg_2020")
const calendar_svg_2019 = d3.select("#calendar_svg_2019")
const calendar_svg_2018 = d3.select("#calendar_svg_2018")
const calendar_svg_2017 = d3.select("#calendar_svg_2017")

const svgArray = [calendar_svg_2022, 
    calendar_svg_2021, calendar_svg_2020, 
    calendar_svg_2019, calendar_svg_2018, 
    calendar_svg_2017
]

const drawTheYears = (svgArray) => {
    const startArray = ['1/1/2022', '1/1/2021', '1/1/2020', '1/1/2019', '1/1/2018', '1/1/2017']
    const endArray = ['12/31/2022', '12/31/2021', '12/31/2020', '12/31/2019', '12/31/2018', '12/31/2017']
    for(let i = 0; i < svgArray.length; i++){
        let chart = RunCharts.drawCalendar(theData, svgArray[i], {
            'startDate': startArray[i],
            'endDate': endArray[i],
            'height': 500,
            'width': 900,
            'margin': {
                left: 0,
                right: 10,
                top: 100,
                bottom: 10
            }
        })
        console.log('start array', startArray[i])
    }
}

drawTheYears(svgArray)

// RunCharts.drawCalendar(theData, calendar_svg_2022, {
//     'startDate': '1/1/2022',
//     'endDate': '12/31/2022',
//     'height': 500,
//     'width': 900,
//     'margin': {
//         left: 0,
//         right: 10,
//         top: 100,
//         bottom: 10
//     }
// });

// RunCharts.drawCalendar(theData, calendar_svg_2021, {
//     'startDate': '1/1/2021',
//     'endDate': '12/31/2021',
//     'height': 500,
//     'width': 900,
//     'margin': {
//         left: 0,
//         right: 10,
//         top: 100,
//         bottom: 10
//     }
// });

// RunCharts.drawCalendar(theData, calendar_svg_2020, {
//     'startDate': '1/1/2020',
//     'endDate': '12/31/2020',
//     'height': 500,
//     'width': 900,
//     'margin': {
//         left: 0,
//         right: 10,
//         top: 100,
//         bottom: 10
//     }
// });

// RunCharts.drawCalendar(theData, calendar_svg_2019, {
//     'startDate': '1/1/2019',
//     'endDate': '12/31/2019',
//     'height': 500,
//     'width': 900,
//     'margin': {
//         left: 0,
//         right: 10,
//         top: 100,
//         bottom: 10
//     }
// });

// RunCharts.drawCalendar(theData, calendar_svg_2018, {
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

// RunCharts.drawCalendar(theData, calendar_svg_2017, {
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
