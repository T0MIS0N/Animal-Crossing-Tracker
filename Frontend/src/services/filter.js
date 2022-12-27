//TODO: Change expire date logic to be five years from now instead of hardcoded.

export default class Filter {
    constructor(donated, activeToday, activeNow, location, weather, spawnCondition, price, critterType, collectedArray) {
        this.donated = donated;
        this.activeToday = activeToday;
        this.activeNow = activeNow;
        this.location = location;
        this.weather = weather;
        this.spawnCondition = spawnCondition;
        this.price = price;
        this.critterType = critterType;
        this.collectedArray = [];
        this.loadCookies()
    }

    filterCritters(critterArray) {
        //If no filters are active, the original critter array is returned.
        if (!this.activeToday && !this.activeNow && !this.donated) {
            return critterArray
        }

        //filteredArray holds all the critters that can pass all active filters.
        var filteredArray = []

        //.map function goes through all the critters in the critterArray in a loop-like manner.
        critterArray.map((critter) => {

            //First, the filters are checked to see if the program is filtering out critters that aren't going to be present today. If the filter is off, the critter automatically passes.
            if (this.activeToday) {
                //If the filter is active, the method to check if the critter is present this month is run. If the critter isn't present, this iteration of the loop is immediately stopped and the next iteration starts.
                if (!isCritterActiveToday(critter, true))
                    return
            }

            if (this.activeNow)
                if (!isCritterActiveNow(critter))
                    return

            if (this.donated)
                if (this.collectedArray.includes(critter.Name)) {
                    return
                }

            //If the critter passes all active filters, it's added to the filteredArray
            filteredArray.push(critter)
        })

        //The filtered array is returned after all critters have ran through the loop
        return filteredArray
    }

    changeCritterType(critterType) {
        this.critterType = critterType;
        document.cookie = "critterType=" + critterType + "; expires=" + new Date("2050") + ";";
    }

    pressDonatedCheckbox(critterName) {
        if (this.collectedArray.includes(critterName)) {
            removeDonatedCritter(critterName, this.collectedArray)
            removeCookie(critterName)
        } else {
            this.collectedArray.push(critterName)
            addCookie(critterName)
        }
    }


    loadCookies() {
        var cookieArray = document.cookie.split("; ")
        for (var i = 0; i < cookieArray.length; i++) {
            var cookieData = cookieArray[i].split("=")
            if (cookieData[0] !== "critterType" && cookieData[1] !== 'undefined' && cookieData[1] !== "0") {
                this.collectedArray.push(cookieData[0])
            }
            if (cookieData[0] === "critterType") {
                this.critterType = cookieData[1]
            }
        }
    }
}

function isCritterActiveToday(critter, isNorthIsland) {
    //First, we set the date based on island type since there are different dates for hemispheres
    var critterDate = critter.NorthMonths
    if (!isNorthIsland)
        critterDate = critter.SouthMonths
    //If our critter's date is all year, it means it's going to be active today, so we can return true now without any other checks
    if (critterDate === "All year") {
        return true
    }
    //If the critter has a date range, we need the current date to see if it's active. These 2 variables hold the current date
    var currentDate = new Date()
    var currentMonth = currentDate.getMonth()
    //Some dates have the ; character which means there's two date sets. In this case, we must check both, but otherwise only need to check one
    if (critterDate.includes(';')) {
        //The date string is split at ';' so both dates can be checked
        var dateArray = critterDate.split(';')
        //If the current date is in either range, the function returns true as that critter is active today.
        if (isDateInRange(dateArray[0], currentMonth) || isDateInRange(dateArray[1], currentMonth))
            return true
    } else {
        //If there's one date, we simply check that one and if the current date is in that range, the function returns true.
        if (isDateInRange(critterDate, currentMonth))
            return true
    }
    return false
}

function isCritterActiveNow(critter) {
    if (critter.Time === "All day")
        return true
    var critterTime = critter.Time
    var currentDate = new Date()
    var currentHour = currentDate.getHours()
    if (critterTime.includes("&")) {
        var timeArray = critterTime.split("&")
        if (isInTimeRange(timeArray[0], currentHour) || isInTimeRange(timeArray[1], currentHour))
            return true
    } else {
        if (isInTimeRange(critterTime, currentHour))
            return true
    }
    return false
}

//This function checks a date range and singular months to see if the current date is in that range or equal to the singular month. If true is returned, the critter is active today.
function isDateInRange(critterDate, currentMonth) {
    //If critter date contains '-' then it means it's a date range and two values need to be checked to see if the current date falls in the range.
    if (critterDate.includes('–')) {
        //The date string is split into an array to allow the checking of both months in the range as numbers.
        var dateArray = critterDate.split('–')
        //Using the date array data, the months are converted to number values to allow checking them against the current date.
        var dateNumArray = [monthToNum(dateArray[0]), monthToNum(dateArray[1])]
        //TODO: Find a good way to comment our methodology is these if conditions.
        if (dateNumArray[0] < dateNumArray[1]) {
            if (currentMonth <= dateNumArray[1] && currentMonth >= dateNumArray[0])
                return true
        }
        if (dateNumArray[0] > dateNumArray[1]) {
            if (currentMonth >= dateNumArray[0] || currentMonth <= dateNumArray[1])
                return true
        }
    }
    //If critter date doesn't contain '-' then it means the date is a single month, so the date is converted to a number and checked against the current date
    else {
        //If the month is equal to the current month, the critter is active today
        if (monthToNum(critterDate) === currentMonth)
            return true
    }
    //If true is never returned in this function, the critter isn't active today and false is returned.
    return false
}

function isInTimeRange(timeRange, currentHour) {
    var timeArray = timeRange.split("–")
    var timeNumArray = [hourToNum(timeArray[0]), hourToNum(timeArray[1])]
    if (timeNumArray[0] < timeNumArray[1]) {
        if (timeNumArray[0] <= currentHour && timeNumArray[1] > currentHour)
            return true
    }
    if (timeNumArray[0] > timeNumArray[1]) {
        if (currentHour >= timeNumArray[0] || currentHour < timeNumArray[1])
            return true
    }
    return false
}

function removeDonatedCritter(critterName, collectedArray) {
    for (var i = 0; i < collectedArray.length; i++) {
        if (collectedArray[i] === critterName)
            return collectedArray.splice(i, 1)
    }
}

function addCookie(critterName) {
    document.cookie = critterName + "=1; expires=" + new Date("2050") + ";";
}

function removeCookie(critterName) {
    document.cookie = critterName + "=0; expires=" + new Date("1970") + ";";
}

//This function turns a date from 12 hr format into a 24 hour number representation
function hourToNum(hourStr) {
    if (hourStr.includes(" "))
        hourStr = hourStr.replace(" ", "")
    //12:00 in 12hr format converts messily to 24, so those two values are brute forced here.
    if (hourStr === "12AM")
        return 0
    if (hourStr === "12PM")
        return 12
    //To convert an AM time to 24hr, nothing needs to be done. The parsed string is returned.
    if (hourStr.includes("AM")) {
        hourStr = hourStr.replace("AM", "")
        return parseInt(hourStr)
        //To convert a PM time to 24hr, 12 hours are added to the time.
    } else if (hourStr.includes("PM")) {
        hourStr = hourStr.replace("PM", "")
        return parseInt(hourStr) + 12
    }
}

//This function returns numbers based on month abbreviation. Ex: Jan returns 0, Dec returns 11
function monthToNum(monthStr) {
    //If the month string has white spaces, it is stripped out to prevent errors in this function.
    if (monthStr.includes(' '))
        monthStr = monthStr.replace(' ', '')
    //This switch statement returns a number representation of a month abreviation string.
    switch (monthStr) {
        case "Jan":
            return 0
        case "Feb":
            return 1
        case "Mar":
            return 2
        case "Apr":
            return 3
        case "May":
            return 4
        case "Jun":
            return 5
        case "Jul":
            return 6
        case "Aug":
            return 7
        case "Sep":
            return 8
        case "Oct":
            return 9
        case "Nov":
            return 10
        case "Dec":
            return 11
    }
}