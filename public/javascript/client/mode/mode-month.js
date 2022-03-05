let calendarMonthJS = {
    movingState: false
};

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

calendarMonthJS.changeActiveDate = (activeDate, prevDate) => {
    let calendarDayPrefix = `main--calendar--carousel--inner--item--month--body--week--day`;
    const year = activeDate.year;
    let month = activeDate.month;
    const date = activeDate.date;
    console.log(activeDate); 

    if (year === prevDate.year && month === prevDate.month) {
        if ($(`.date--${year}-${month}-${date}`).hasClass(`${calendarDayPrefix}__active`)) {
            month++;
            let trail = `${year}`;
            trail += `-${(month < 10) ? `0${month}` : month}`;
            trail += `-${(date < 10) ? `0${date}` : date}`;

            if ($(`.date--${year}-${month-1}-${date} .main--calendar--carousel--inner--item--month--body--week--day--lower--title`).length) {
                // alert(`WOWEE`);
                window.location.href = `/post/${trail}`;
            } else {
                window.location.href = `/compose/${trail}`;
            }
        } else {
            $(`.${calendarDayPrefix}__active`).addClass(`${calendarDayPrefix}__current`);
            $(`.${calendarDayPrefix}__active`).removeClass(`${calendarDayPrefix}__active`);

            $(`.date--${year}-${month}-${date}`).addClass(`${calendarDayPrefix}__active`);
            $(`.date--${year}-${month}-${date}`).removeClass(`${calendarDayPrefix}__current`);
        }
    } else {
        // * This is what happens if the active date isn't within the current month
        const newPage = calendarMonthJS.findPages(year, month);
        calendarMonthJS.buildPageHTML(newPage, activeDate);
    }
}

calendarMonthJS.buildPageHTML = (currentPage, activeDate) => { // * OKAY
    $(`.header--navbar--title--context--date-picker p`).html(`${activeDate.monthString} ${activeDate.year}`);
    $(`.main--calendar--carousel--inner`).html(``);

    // console.log(currentPage);  

    let carouselItemPrefix = `main--calendar--carousel--inner--item--month`;

    daysOfTheWeekDiv();

    function calendarDiv() {
        let result = ``;
        for (let i = 0; i < 3; i++) {
            result += `<div class="carousel-item-${i+1} carousel-item main--calendar--carousel--inner--item">`;
            result += `<div class="${carouselItemPrefix}">`;
            // result += daysOfTheWeekDiv(i);
            result += calendarBodyDiv(i);
            result += `</div>`;
            result += `</div>`;
        }
        // result += prevAndNextBtn(index);
        return result;
    }

    function prevAndNextBtn() {
        let prevBtn = `<button class="calendar--button calendar--prev" onclick="calendarMonthJS.movePage('previous')">`;
        prevBtn += `<i class="fa-solid fa-arrow-left"></i>`;
        prevBtn += `</button>`;

        let nextBtn = `<button class="calendar--button calendar--next" onclick="calendarMonthJS.movePage('next')">`;
        nextBtn += `<i class="fa-solid fa-arrow-right"></i>`;
        nextBtn += `</button>`;

        return prevBtn + nextBtn;
    }

    function daysOfTheWeekDiv() {
        const daysOfTheWeekArray = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
        let result = `<div class="main--calendar--days--head">`;
        for (let i = 0; i < 7; i++) {
            result += `<div class="main--calendar--days--head--day calendar--day-${daysOfTheWeekArray[i].toLowerCase()}">`;
            result += `<p>`;
            result += `${daysOfTheWeekArray[i]}`;
            result += `</p>`;
            result += `</div>`;
        }
        result += `</div>`;
        $(`.main--calendar--days`).html(result);
    }

    function calendarBodyDiv(index) {
        let result = `<div class="${carouselItemPrefix}--body">`;
        let entryIsCurrent = false;
        for (let i = 0, t = 0; i < 6; i++) {
            let weekDivHTML = `<div class="${carouselItemPrefix}--body--week calendar--week-${i}">`;
            for (let k = 0; k <= 6 && t < 42; k++, t++) {
                const entry = currentPage[index][t];

                let onclick;

                if (entry.month === activeDate.month) {
                    onclick = `onclick="calendarJS.changeActiveDate(${entry.year},${entry.month},${entry.date})"`;
                    entryIsCurrent = true;
                } else if (entryIsCurrent === false) {
                    onclick = `onclick="calendarMonthJS.emulateCarouselClick('previous',${entry.year},${entry.month},${entry.date})"`;
                } else {
                    onclick = `onclick="calendarMonthJS.emulateCarouselClick('next',${entry.year},${entry.month},${entry.date})"`;
                }

                // const onclick = `onclick="calendarJS.changeActiveDate(${entry.year},${entry.month},${entry.date})"`;
                const dayStatus = (entry.date === activeDate.date && entry.month === activeDate.month) ? `active` : (entry.month === activeDate.month) ? `current` : `noncurrent`;
                let calendarDayPrefix = `${carouselItemPrefix}--body--week--day`;
                let classes = ``;
                // classes += `calendar--week-${i}--day `;
                // classes += `calendar--week-${i}--day-${k} `;
                classes += `date--${entry.year}-${entry.month}-${entry.date} `;
                // classes += `calendar--day `;
                classes += `${calendarDayPrefix}__${dayStatus} `;
                classes += `${calendarDayPrefix} `;
                classes += ``;

                let dayDivHTML = `<div class="${classes}" ${onclick}>`;
                dayDivHTML += `<div class="${classes} ${calendarDayPrefix}--upper">`;
                dayDivHTML += `<p class="${calendarDayPrefix}--upper--date calendar--day--date">`;
                dayDivHTML += `${entry.monthString.slice(0,3)} ${entry.date}`;
                // dayDivHTML += `Mar 4`;
                dayDivHTML += `</p>`;
                dayDivHTML += `</div>`;
                dayDivHTML += `<div class="${classes} ${calendarDayPrefix}--lower">`;

                if (entry.hasOwnProperty(`post`)) {
                    dayDivHTML += `<p class="${calendarDayPrefix}--lower--title">`;
                    dayDivHTML += `${entry.post.title}`;
                    dayDivHTML += `</p>`;
                }

                dayDivHTML += `</div>`;
                dayDivHTML += `</div>`;
                weekDivHTML += dayDivHTML;
            }
            weekDivHTML += `</div>`;
            result += weekDivHTML;
        }
        result += `</div>`;
        return result;
    }

    // $(`.main--calendar`).append(calendarDiv());

    $(`.main--calendar--carousel--inner`).html(calendarDiv());
    $(`.carousel-item-2`).addClass(`active`);
}

calendarMonthJS.movePage = (direction, state) => {
    // console.log(`movePage(${direction}, ${state})`);
    if (calendarMonthJS.movingState === false) {
        // if ($(`.calendar--button`).hasOwnProperty(`disabled`)) {
        calendarMonthJS.movingState = true;
        const activeDate = JSON.parse(JSON.stringify(calendarJS.activeDate));

        $(`.calendar--button`).prop(`disabled`, true);

        // console.log(direction);
        if (direction === "next") {
            activeDate.year = (activeDate.month != 11) ? activeDate.year : activeDate.year + 1;
            activeDate.month = (activeDate.month != 11) ? activeDate.month + 1 : 0;
            // activeDate.date = 1;
        } else {
            activeDate.year = (activeDate.month != 0) ? activeDate.year : activeDate.year - 1;
            activeDate.month = (activeDate.month != 0) ? activeDate.month - 1 : 11;
            // activeDate.date = 1;
        }

        activeDate.count = calendarJS.daysInMonth(activeDate.month + 1, activeDate.year);
        activeDate.monthString = calendarJS.getMonthString(activeDate.month);
        activeDate.startDay = new Date(activeDate.year, activeDate.month, 1).getDay();
        activeDate.date = (activeDate.date > activeDate.count) ? activeDate.count : activeDate.date;

        calendarJS.activeDate = activeDate;

        $(`.header--navbar--title--context--date-picker--input`).val(`${activeDate.year}-${(activeDate.month<9)?'0'+(activeDate.month+1):(activeDate.month+1)}-${(activeDate.date<10)?'0'+activeDate.date:activeDate.date}`);

        let activeCalendarPage = calendarMonthJS.findPages(activeDate.year, activeDate.month);
        console.log(activeCalendarPage); 
        setTimeout(() => {
            calendarMonthJS.buildPageHTML(activeCalendarPage, activeDate);
            $(`.calendar--button`).prop(`disabled`, false);
            calendarMonthJS.movingState = false;
        }, 600);
    }
}

calendarMonthJS.findPages = (year, month) => { // * OKAY
    let result = [];

    let months = [
        {
            year: (month < 1) ? year - 1 : year,
            month: (month < 1) ? 11 : month - 1,
        },
        {
            year: year,
            month: month,
        },
        {
            year: (month > 10) ? year + 1 : year,
            month: (month > 10) ? 0 : month + 1,
        },
    ];

    for (let i = 0; i < 3; i++) {
        let iYear = months[i].year;
        let iMonth = months[i].month;
        result.push(calendarMonthJS.pages[((iYear - calendarJS.minYear) * 12) + iMonth]);
    }

    return result;
    // return calendarMonthJS.pages[((year - calendarJS.minYear) * 12) + month];
}