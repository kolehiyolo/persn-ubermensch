let calendarWeekJS = {};


calendarWeekJS.buildPageHTML = (currentPage, activeDate) => { // * OKAY
    // $(`.header--navbar--title--context--date-picker p`).html(`${activeDate.monthString} ${activeDate.year}`);
    // $(`.main--calendar--carousel--inner`).html(``);

    // let carouselItemPrefix = `main--calendar--carousel--inner--item--month`;

    // daysOfTheWeekDiv();

    // function calendarDiv() {
    //     let result = ``;
    //     for (let i = 0; i < 3; i++) {
    //         result += `<div class="carousel-item-${i+1} carousel-item main--calendar--carousel--inner--item">`;
    //         result += `<div class="${carouselItemPrefix}">`;
    //         // result += daysOfTheWeekDiv(i);
    //         result += calendarBodyDiv(i);
    //         result += `</div>`;
    //         result += `</div>`;
    //     }
    //     // result += prevAndNextBtn(index);
    //     return result;
    // }

    // function daysOfTheWeekDiv() {
    //     const daysOfTheWeekArray = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
    //     let result = `<div class="main--calendar--days--head">`;
    //     for (let i = 0; i < 7; i++) {
    //         result += `<div class="main--calendar--days--head--day calendar--day-${daysOfTheWeekArray[i].toLowerCase()}">`;
    //         result += `<p>`;
    //         result += `${daysOfTheWeekArray[i]}`;
    //         result += `</p>`;
    //         result += `</div>`;
    //     }
    //     result += `</div>`;
    //     $(`.main--calendar--days`).html(result);
    // }

    // function calendarBodyDiv(index) {
    //     let result = `<div class="${carouselItemPrefix}--body">`;
    //     let entryIsCurrent = false;
    //     for (let i = 0, t = 0; i < 6; i++) {
    //         let weekDivHTML = `<div class="${carouselItemPrefix}--body--week calendar--week-${i}">`;
    //         for (let k = 0; k <= 6 && t < 42; k++, t++) {
    //             const entry = currentPage[index][t];

    //             let onclick;

    //             if (entry.month === activeDate.month) {
    //                 onclick = `onclick="calendarJS.changeActiveDate(${entry.year},${entry.month},${entry.date})"`;
    //                 entryIsCurrent = true;
    //             } else if (entryIsCurrent === false) {
    //                 onclick = `onclick="calendarMonthJS.emulateCarouselClick('previous',${entry.year},${entry.month},${entry.date})"`;
    //             } else {
    //                 onclick = `onclick="calendarMonthJS.emulateCarouselClick('next',${entry.year},${entry.month},${entry.date})"`;
    //             }

    //             // const onclick = `onclick="calendarJS.changeActiveDate(${entry.year},${entry.month},${entry.date})"`;
    //             const dayStatus = (entry.date === activeDate.date && entry.month === activeDate.month) ? `active` : (entry.month === activeDate.month) ? `current` : `noncurrent`;
    //             let calendarDayPrefix = `${carouselItemPrefix}--body--week--day`;
    //             let classes = ``;
    //             // classes += `calendar--week-${i}--day `;
    //             // classes += `calendar--week-${i}--day-${k} `;
    //             classes += `date--${entry.year}-${entry.month}-${entry.date} `;
    //             // classes += `calendar--day `;
    //             classes += `${calendarDayPrefix}__${dayStatus} `;
    //             classes += `${calendarDayPrefix} `;
    //             classes += ``;

    //             let dayDivHTML = `<div class="${classes}" ${onclick}>`;
    //             dayDivHTML += `<div class="${classes} ${calendarDayPrefix}--upper">`;
    //             dayDivHTML += `<p class="${calendarDayPrefix}--upper--date calendar--day--date">`;
    //             dayDivHTML += `${entry.monthString.slice(0,3)} ${entry.date}`;
    //             // dayDivHTML += `Mar 4`;
    //             dayDivHTML += `</p>`;
    //             dayDivHTML += `</div>`;
    //             dayDivHTML += `<div class="${classes} ${calendarDayPrefix}--lower">`;

    //             if (entry.hasOwnProperty(`post`)) {
    //                 dayDivHTML += `<p class="${calendarDayPrefix}--lower--title">`;
    //                 dayDivHTML += `${entry.post.title}`;
    //                 dayDivHTML += `</p>`;
    //             }

    //             dayDivHTML += `</div>`;
    //             dayDivHTML += `</div>`;
    //             weekDivHTML += dayDivHTML;
    //         }
    //         weekDivHTML += `</div>`;
    //         result += weekDivHTML;
    //     }
    //     result += `</div>`;
    //     return result;
    // }

    // $(`.main--calendar--carousel--inner`).html(calendarDiv());
    // $(`.carousel-item-2`).addClass(`active`);
}

calendarWeekJS.buildPageHTML = () => {
    $(`.main--calendar--carousel--inner`).html(``);

    function calendarDiv() {
        let result = ``;

        for (let i = 0; i < 3; i++) {
            let classList = `main--calendar--carousel--inner--item carousel-item carousel-item-${i}`;
            result += `<div class="${classList}">`;
            result += `<div class="main--calendar--carousel--inner--item--week">`;
            result += `<div class="main--calendar--carousel--inner--item--week--center">`;
            result += `<h2>Week ${i}</h2>`;
            result += `</div>`;
            result += `</div>`;
            result += `</div>`;
        }

        return result;
    }

    $(`.main--calendar--carousel--inner`).html(calendarDiv());
    $(`.carousel-item-0`).addClass(`active`);
};


calendarWeekJS.findPages = (year, month, date) => { // * OKAY
    let result = [];

    // let weeks = [
    //     {
    //         year: (month < 1) ? year - 1 : year,
    //         month: (month < 1) ? 11 : month - 1,
    //         date: 1,
    //     },
    //     {
    //         year: year,
    //         month: month,
    //         date: date,
    //     },
    //     {
    //         year: (month > 10) ? year + 1 : year,
    //         month: (month > 10) ? 0 : month + 1,
    //         date: date,
    //     },
    // ];

    // for (let i = 0; i < 3; i++) {
    //     let iYear = weeks[i].year;
    //     let iMonth = weeks[i].month;
    //     result.push(calendarWeekJS.pages[((iYear - calendarJS.minYear) * 12) + iMonth]);
    // }
    let index = ((((year - calendarJS.minYear) * 12) + month) * 6)-1;

    for (let i = 0; i < 8; i++) {
        result.push(calendarWeekJS.pages[index + i]);
    }

    console.log(`${index}`);
    console.log(result);
    return result;
}