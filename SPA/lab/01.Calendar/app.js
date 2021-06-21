const yearsView = document.querySelector(".yearsCalendar")
const monthsView = Array.from(document.querySelectorAll(".monthCalendar"));
const daysView = Array.from(document.querySelectorAll(".daysCalendar"));

document.body.innerHTML = "";
document.body.appendChild(yearsView);

yearsView.addEventListener("click", (ev) => {
    if (ev.target.className == "day" || ev.target.className == "date") {
        ev.stopImmediatePropagation();
        let currYear = monthsView
            .filter(m => m.id == `year-${ev.target.textContent.trim()}`);
        document.body.innerHTML = "";
        document.body.appendChild(currYear[0])
    }
})

document.body.addEventListener("click", (ev) => {
    if (ev.target.tagName == "CAPTION") {
        let currSectId = ev.target.parentNode.parentNode.id;
        if (currSectId.includes("year")) {
            document.body.innerHTML = "";
            document.body.appendChild(yearsView)
        } else if (currSectId.includes("month-")) {
            let currYearNum = `${currSectId.split("-")[1]}`;
            document.body.innerHTML = "";
             let currYear = monthsView
                .filter(m => m.id == `year-${currYearNum}`);
            document.body.appendChild(currYear[0])
        }
    } else if (ev.target.className == "day" || ev.target.className == "date") {
        let monthSelected = ev.target.textContent.trim();
        if (months.hasOwnProperty(monthSelected)) {
            let currYear = document.body.querySelector("table caption").textContent.trim();
            let currMonth = daysView
                .filter(m => m.id == `month-${currYear}-${months[monthSelected]}`);
            document.body.innerHTML = "";
            document.body.appendChild(currMonth[0])
        }
    }
})

let months = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12,
}
