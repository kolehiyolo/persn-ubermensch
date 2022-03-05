let headerJS = {};

// * addEventListeners()
headerJS.addEventListeners = () => {
    $(`.header--navbar--title--context--date-picker--input`).change(() => {
        const newDate = $(`.header--navbar--title--context--date-picker--input`).val().split(`-`);

        const date = {
            year: newDate[0],
            month: newDate[1] - 1,
            date: newDate[2]
        };

        calendarJS.changeActiveDate(date.year, date.month, date.date);
    });
}

headerJS.changeViewMode = (mode) => {
    console.log(`changeViewMode(${mode})`);

    // if ($(`.header--navbar--menu--ul--li--mode__active`).hasClass(`header--navbar--menu--ul--li--mode`)) {
    //     window.location.href = `/${mode}`;
    // } else {
    // * Update Styling for Active Button
    $(`.header--navbar--menu--ul--li--mode__active`).removeClass(`header--navbar--menu--ul--li--mode__active`);
    $(`.header--navbar--menu--ul--li--mode--${mode}`).addClass(`header--navbar--menu--ul--li--mode__active`);

    if (mode != calendarJS.mode) {
        calendarJS.mode = mode;

        switch (mode) {
            case "grid":
                modeGridJS.buildPageHTML();
                break;
            case "list":
                modeListJS.buildPageHTML();
                break;
            case "month":
                let activeMonthPage = calendarMonthJS.findPages(calendarJS.activeDate.year, calendarJS.activeDate.month);
                calendarJS.buildCalendarCarousel();
                calendarMonthJS.buildPageHTML(activeMonthPage, calendarJS.activeDate);
                break;
            case "week":
                let activeWeekPage = calendarWeekJS.findPages(calendarJS.activeDate.year, calendarJS.activeDate.month, calendarJS.activeDate.date);
                calendarJS.buildCalendarCarousel();
                calendarWeekJS.buildPageHTML(activeWeekPage, calendarJS.activeDate);
                break;
            case "date":
                calendarJS.buildCalendarCarousel();
                calendarDateJS.buildPageHTML();
                break;
        }
    }
    // }

}

// * writeForToday()
headerJS.writeForToday = () => {
    const today = JSON.parse(JSON.stringify(calendarJS.currentDate));

    let trail = `${today.year}`;
    trail += `-${(today.month < 10) ? `0${today.month + 1}` : today.month + 1}`;
    trail += `-${(today.date < 10) ? `0${today.date}` : today.date}`;
    window.location.href = `/compose/${trail}`;
}