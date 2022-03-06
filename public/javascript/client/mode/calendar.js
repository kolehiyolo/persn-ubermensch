// * calendar.js
// This file contains all the scripts needed to make the Calendar functionalities work on the homepage

// * Global Variables
// I just like having a global object with properties used all throughout the file 
let calendarJS = {
    currentDate: undefined, // Should contain the current date and time
    activeDate: undefined, // Should contain the data for the selected date by the user
    minYear: 1950, // Should indicate the minimum year the calendar can get to 
    maxYear: 2050, // Should indicate the maximum 
    activeCalendarPageIndex: undefined, // Should indicate the index used to fetch the selected Calendar Page from allCalendarPages, which is then passed to activeCalendarPage
    mode: undefined
}

// * Converter Functions
// Functions that accept input data then return the appropriate output data
calendarJS.daysInMonth = (month, year) => { // * OKAY
    // This returns the number of days in a month

    // Month in JavaScript is 0-indexed (January is 0, February is 1, etc), but
    // by using 0 as the day it will give us the last day of the prior month. So
    // passing in 1 as the month number will return the last day of January, not
    // February
    return new Date(year, month, 0).getDate();
}

calendarJS.getMonthString = (month) => { // * OKAY
    // This returns the string equivalent of a month
    return (month === 0) ? `January` :
        (month === 1) ? `February` :
        (month === 2) ? `March` :
        (month === 3) ? `April` :
        (month === 4) ? `May` :
        (month === 5) ? `June` :
        (month === 6) ? `July` :
        (month === 7) ? `August` :
        (month === 8) ? `September` :
        (month === 9) ? `October` :
        (month === 10) ? `November` :
        `December`;
}

calendarJS.buildCalendarCarousel = () => {
    let result =
        `<div class="main--calendar">
            <div class="main--calendar--days">
            </div>
            <div id="carouselExampleControls" class="main--calendar--carousel carousel slide" data-bs-ride="false" data-bs-interval="false">
                <div class="main--calendar--carousel--inner carousel-inner">
                </div>
                <button class="
                main--calendar--carousel--button
                main--calendar--carousel--button--prev
                calendar--button
                calendar--prev carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onclick="calendarJS.movePage('previous','default')">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="
                main--calendar--carousel--button
                main--calendar--carousel--button--next
                calendar--button calendar--next carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onclick="calendarJS.movePage('next','default')">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>`;

    $(`.main`).html(result);
}



// * State-change Functions
// Functions that change the values on the global object, values that the app are dependent on when indicating states
calendarJS.getCurrentDate = () => { // * OKAY
    // This sets the currentDate object the proper values
    let result;
    const date = new Date();

    result = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay()
    }

    // Here we fetch the string version of the month
    result.monthString = calendarJS.getMonthString(result.month);

    return result;
}

// ! -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// * Calendar-Data Functions
// Functions that build the massive amounts of data that is used as content for the app
// These build the Calendar Pages, each of which house the dates, with each supposedly having blog entries, to-do lists and more
// I could certainly just have such data placed on a database but for now, having them here is good enough
// Find a way to have the data generated here available on the backend
calendarJS.getMonthPages = (minYear, maxYear) => { // * OKAY
    // Returns an array of all Calendar Pages found from minYear to maxYear
    let result = [];

    function getPage(year, month) {
        // This returns an array filled with dates to fill a calendar page
        let result = []; // Should house all the 42 dates

        const active = {
            count: calendarJS.daysInMonth(month + 1, year),
            monthString: calendarJS.getMonthString(month),
            startDay: new Date(year, month, 1).getDay(),
        }

        const prevMonth = {
            month: (month != 0) ? month - 1 : 11,
            year: (month != 0) ? year : year - 1,
        }
        const nextMonth = {
            month: (month != 11) ? month + 1 : 0,
            year: (month != 11) ? year : year + 1,
        }

        prevMonth.count = calendarJS.daysInMonth(prevMonth.month + 1, prevMonth.year);
        prevMonth.monthString = calendarJS.getMonthString(prevMonth.month);
        nextMonth.count = calendarJS.daysInMonth(nextMonth.month + 1, nextMonth.year);
        nextMonth.monthString = calendarJS.getMonthString(nextMonth.month);
        nextMonth.startDay = new Date(nextMonth.year, nextMonth.month, 1).getDay();

        const startDate = (active.startDay === 0) ? {
            month: month,
            date: 1,
            year: year,
            day: 0
        } : {
            month: prevMonth.month,
            date: prevMonth.count - active.startDay + 1,
            year: prevMonth.year,
            day: 0
        };
        const endDate = {
            month: nextMonth.month,
            date: 42 - active.count - active.startDay,
            year: nextMonth.year,
            day: 6
        };

        // -* We get the trailing days from the previous month
        if (active.startDay != 0) {
            for (let i = startDate.date, j = 0; i <= prevMonth.count; i++, j++) {
                result.push({
                    month: prevMonth.month,
                    monthString: prevMonth.monthString,
                    date: i,
                    year: prevMonth.year,
                    day: j,
                });
            }
        }

        // -* Now we add the active month
        for (let i = 1, j = active.startDay; i <= active.count; i++, j++) {
            j = (j <= 6) ? j : 0;
            result.push({
                month: month,
                monthString: active.monthString,
                date: i,
                year: year,
                day: j
            });
        }

        // -* Finally, we add the starting dates of the next month
        for (let i = 1, j = nextMonth.startDay; i <= endDate.date; i++, j++) {
            j = (j <= 6) ? j : 0;
            result.push({
                month: nextMonth.month,
                monthString: nextMonth.monthString,
                date: i,
                year: nextMonth.year,
                day: j
            });
        }

        return result;
    }

    for (let year = minYear; year <= maxYear; year++) {
        for (let month = 0; month <= 11; month++) {
            result.push(getPage(year, month));
        }
    }
    return result;
}

calendarJS.getWeekPages = (calendarMonthPages) => { // * OKAY
    // Returns an array of all Calendar Pages found from minYear to maxYear
    let result = [];
    // console.log(calendarMonthPages);

    calendarMonthPages.forEach((page, index) => {
        result.push(page.slice(0,7));
        result.push(page.slice(7,14));
        result.push(page.slice(14,21));
        result.push(page.slice(21,28));
        // result.push(page.slice(28,35));
        // result.push(page.slice(35));
    });

    // console.log(result); 
    return result;
}

calendarJS.changeActiveDate = (year, month, date) => {
    // console.log(`calendarJS.changeActiveDate(${year}, ${month}, ${date})`); 
    year = parseInt(year);
    month = parseInt(month);
    date = parseInt(date);

    const prevDate = JSON.parse(JSON.stringify(calendarJS.activeDate));

    activeDate = {
        year: year,
        month: month,
        date: date
    };

    activeDate.monthString = calendarJS.getMonthString(activeDate.month);
    activeDate.day = new Date(activeDate.year, activeDate.month, 1).getDay();

    calendarJS.activeDate = activeDate;

    $(`.header--navbar--title--context--date-picker--input`).val(`${year}-${(month<9)?'0'+(month+1):(month+1)}-${(date<10)?'0'+date:date}`);

    switch (calendarJS.mode) {
        case "month":
            calendarMonthJS.changeActiveDate(activeDate, prevDate);
            break;
        case "week":
            break;
        case "date":
            break;
    }
}

calendarJS.movePage = (direction, state) => {
    switch (calendarJS.mode) {
        case "month":
            calendarMonthJS.movePage(direction, state);
            break;
        case "week":
            break;
        case "date":
            break;
    }
}

// ! -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+