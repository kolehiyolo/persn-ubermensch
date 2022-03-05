console.log(`RUNNING pseudodata.js`);

function addEntriesToCalendarPages() {
    entryDB.forEach((entry, index) => {
        let calendarPageIndex = ((entry.date.date.year - calendarJS.minYear) * 12) + (entry.date.date.month);
        
        let calendarPage = calendarJS.allCalendarPages[calendarPageIndex];
        let selectedDate = calendarPage.findIndex((pageEntry) => {
            return pageEntry.month === entry.date.date.month && pageEntry.date === entry.date.date.date;
        });
        
        let prevSelectedDate = calendarJS.allCalendarPages[calendarPageIndex - 1].findIndex((pageEntry) => {
            return pageEntry.month === entry.date.date.month && pageEntry.date === entry.date.date.date;
        });

        let nextSelectedDate = calendarJS.allCalendarPages[calendarPageIndex + 1].findIndex((pageEntry) => {
            return pageEntry.month === entry.date.date.month && pageEntry.date === entry.date.date.date;
        });

        // -* Let's check if the following page also has 
        calendarJS.allCalendarPages[calendarPageIndex][selectedDate].post = entry;
        if (nextSelectedDate != -1) {
            calendarJS.allCalendarPages[calendarPageIndex + 1][nextSelectedDate].post = entry;
        }
        if (prevSelectedDate != -1) {
            calendarJS.allCalendarPages[calendarPageIndex - 1][prevSelectedDate].post = entry;
        }
    });
}

addEntriesToCalendarPages();