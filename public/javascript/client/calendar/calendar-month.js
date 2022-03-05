let calendarMonthJS = {};


calendarMonthJS.emulateCarouselClick = (direction, year, month, date) => {
    if (direction === `previous`) {
        $(".carousel-control-prev-icon").click();
    } else {
        $(".carousel-control-next-icon").click();
    }

    setTimeout(() => {
        calendarJS.changeActiveDate(year, month, date);
    }, 600);
}

calendarMonthJS.getAllCalendarPages = (minYear, maxYear) => { // * OKAY
    // Returns an array of all Calendar Pages found from minYear to maxYear
    let result = [];
    for (let year = minYear; year <= maxYear; year++) {
        for (let month = 0; month <= 11; month++) {
            result.push(calendarMonthJS.getCalendarPage(year, month));
        }
    }
    return result;
}

calendarMonthJS.getCalendarPage = (year, month) => { // TODO We can do better
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