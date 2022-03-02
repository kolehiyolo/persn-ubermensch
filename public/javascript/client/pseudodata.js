console.log(`RUNNING pseudodata.js`);

function addEntriesToCalendarPages() {
    entryDB.forEach((entry, index) => {
        // console.log(`Entry:`); 
        // console.log(entry.date.date.year); 
        // console.log(entry.date.date.month); 
        // console.log(entry.date.date.date); 
        // let calendarPage = findCalendarPage(entry.stamp.date.year, entry.stamp.date.month);
        let calendarPageIndex = ((entry.date.date.year - calendarJS.minYear) * 12) + entry.stamp.date.month;
        let calendarPage = calendarJS.allCalendarPages[calendarPageIndex];
        let selectedDate = calendarPage.findIndex((pageEntry) => {
            return pageEntry.month === entry.date.date.month && pageEntry.date === entry.date.date.date;
        });

        // console.log(`entryDB`); 
        // console.log(calendarPage);
        // console.log(selectedDate);  

        calendarJS.allCalendarPages[calendarPageIndex][selectedDate].post = entry;
        // console.log(calendarJS.allCalendarPages[calendarPageIndex][selectedDate]); 

    });
}

addEntriesToCalendarPages();