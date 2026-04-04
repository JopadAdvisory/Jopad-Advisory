const API_URL = "https://jopad-backend.onrender.com";
const durationButton = document.querySelectorAll(".duration");
const dateButtons = document.querySelectorAll(".date-btn");
const timeButtons = document.querySelectorAll(".time-btn");
const durationText = document.querySelectorAll(".duration-text");
const durationIndicator = document.querySelectorAll(".duration-indicator");
const day = document.getElementById("day");
const fullDate = document.getElementById("full-date");
const bodyDuration = document.getElementById("body-duration");
const dateField = document.getElementById("date-field");
const page = document.getElementsByTagName("section");
const errorStatus = document.querySelectorAll(".error-status");
const formBtn = document.querySelectorAll(".form-btn");
const form = document.getElementsByClassName("advisory__form")[0];

const STORAGE_KEY = "formData";

function loadInitialState() {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {}
}

function createState(initialObject) {
    let state = initialObject;
    
    function setState(newData) {
        state = {...state, ...newData};
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        render();
    }
    
    function getState() {
        return state;
    }

    return [getState, setState];
}

const [formData, setFormData] = createState(loadInitialState());

// Welcome page
durationButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        setFormData({
            dText: btn.textContent.trim(),
            duration: btn.dataset.duration,
        });

        page[0].classList.remove("active");
        page[1].classList.add("active");
    })
});


// Date selection page
async function initDatePicker() {
    try {
        const res = await fetch(`${API_URL}/api/advisory/booked`);
        const bookings = await res.json();
        
        const duration = formData().duration || 30;
        const fullyBookedDates = getFullyBookedDates(bookings, duration);

        flatpickr("#date-picker", {
            inline: true,
            minDate: "today",
            maxDate: new Date().fp_incr(365),
            disable: [
                function(date) {
                    return date.getDay() === 0 || date.getDay() === 6;
                },
                ...fullyBookedDates
            ],
            disableMobile: "true",

            onChange: function(selectedDates) {
                const selectedDate = selectedDates[0];
                setFormData({
                    dayString: formatDay(selectedDate),
                    dateString: formatFullDate(selectedDate)
                });
                
                const updatedState = formData();

                page[1].classList.remove("active");
                page[2].classList.add("active");

                day.textContent = updatedState.dayString;
                dateField.textContent = updatedState.dateString;
            
                const allSlots = generateTimeSlots(updatedState.duration, selectedDate);

                const availableSlots = filterAvailableSlots(allSlots, bookings, selectedDate);

                renderTimeSlots(availableSlots);
            }
        });
    } catch (err) {
        console.log("Error loading bookings:", err);
    }
}

dateButtons[0].addEventListener("click", () => {
    page[0].classList.add("active");
    page[1].classList.remove("active");
});

function getFullyBookedDates(bookings, duration) {
    const grouped = {};

    bookings.forEach(booking => {
        if (!booking.startTime) return;
        const dateObj = new Date(booking.startTime);
        if (isNaN(dateObj)) return;

        const date = dateObj.toISOString().split("T")[0];

        if (!grouped[date]) grouped[date] = []
        grouped[date].push(booking);
    });

    return Object.keys(grouped).filter(date => {
        const totalSlots = generateTimeSlots(duration, new Date(date)).length;
        return grouped[date].length >= totalSlots;
    });
}
function formatFullDate(date) {
    return date.toLocaleDateString("en-US", 
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }
    
function formatDay(date) {
    return date.toLocaleDateString("en-US", 
        {
        weekday: "long",
    });
}
initDatePicker();

// setInterval(() => {
//     initDatePicker();
// }, 10_000);

function generateTimeSlots(duration, selectedDate) {
    const slots = [];
    
    const startHour = 9;
    const endHour = 17;
    
    let current = new Date(selectedDate);
    current.setHours(startHour, 0, 0, 0);
    
    let end = new Date(selectedDate);
    end.setHours(endHour, 0, 0, 0);

    while (current < end) {
        slots.push(new Date(current));

        // Move forward by duration (30 or 60 minutes)
        current.setMinutes(current.getMinutes() + Number(duration));
    }
    
    return slots
}

function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function filterAvailableSlots(slots, bookings, selectedDate) {
    return slots.filter(slot => {
        return !bookings.some(booking => {
            if (!booking.startTime) return false;
            const bookingDate = new Date(booking.startTime);

            return bookingDate.getTime() === slot.getTime();     
        });
    });
}

function renderTimeSlots(slots) {
    const container = document.getElementById("time-slots");
    container.innerHTML = "";

    slots.forEach(slot => {
        const btn = document.createElement("button");
        
        btn.textContent = formatTime(slot);
        btn.classList.add("btn", "time-slot");
        btn.addEventListener("click", () => {
            setFormData({
                time: slot.toISOString(),
                timeString: formatTime(slot),
                timeRange: formatTimeRange(slot, formData().duration)
            });
            
            
            page[2].classList.remove("active");
            page[3].classList.add("active");
        });
        container.appendChild(btn);
    });
}

timeButtons[0].addEventListener("click", () => {
    page[2].classList.remove("active");
    page[1].classList.add("active");
});

function calculateEndTime(startTime, duration) {
    const end = new Date(startTime);

    end.setMinutes(end.getMinutes() + Number(duration));

    return end;
}

function formatTimeRange(startTime, duration) {
    const endTime = calculateEndTime(startTime, duration);

    return `${formatTime(startTime)} - ${formatTime(endTime)}`
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const state = formData();
    const advisoryFormData = new FormData(form);

    const firstName = (advisoryFormData.get("first-name") || "").trim();
    const lastName = (advisoryFormData.get("last-name") || "").trim();
    const email = (advisoryFormData.get("email") || "").trim();
    const number = (advisoryFormData.get("number") || "").trim();
    const description = (advisoryFormData.get("description") || "").trim();
    const referral = (advisoryFormData.get("referral") || "").trim();
    const referralName = (advisoryFormData.get("referral-name") || "").trim();
    const inputs = form.getElementsByTagName("input");

    let isValid = true;
    
    errorStatus.forEach(status => {
        status.textContent = "";
    });


    if (!referral) {
        errorStatus[5].textContent = "Please select and option.";
        isValid = false
    }

    if (!description) {
        errorStatus[4].textContent = "Can't be blank.";
        inputs[4].style.border = "1px solid red";
        inputs[4].focus();
        isValid = false
    } else {
        inputs[4].style.border = "";
    }
    
    if (!number || number.length < 11 || isNaN(number)) {
        errorStatus[3].textContent = "Please enter a valid number.";
        inputs[3].focus();
        inputs[3].style.border = "1px solid red";
        isValid = false
    } else {
        inputs[3].style.border = "";
    }
    
    if (!email.includes("@")) {
        errorStatus[2].textContent = "Please enter a valid email.";
        inputs[2].style.border = "1px solid red";
        inputs[2].focus();
        isValid = false
    } else {
        inputs[2].style.border = "";
    }
    
    if (!lastName || lastName.length < 2) {
        errorStatus[1].textContent = "Last name is required.";
        inputs[1].style.border = "1px solid red";
        inputs[1].focus();
        isValid = false
    } else {
        inputs[1].style.border = "";
    }
    
    if (!firstName || firstName.length < 2) {
        errorStatus[0].textContent = "First name is required.";
        inputs[0].style.border = "1px solid red";
        inputs[0].focus();
        isValid = false
    } else {
        inputs[0].style.border = "";
    }
    
    

    if (!isValid) return;
    
    setFormData({
        firstName,
        lastName,
        email,
        number,
        description,
        referral,
        referralName,
    });

    const bookingData = {
        ...state,
        firstName,
        lastName,
        email,
        number,
        description,
        referral,
        referralName,
    }
    console.log("Sending to backend", bookingData);

    try {
        const res = await fetch(`${API_URL}/api/advisory/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();

        console.log("Backend status:", res.status);
        console.log("Backend response:", data);

        if (res.status === 409 ) {
            alert("Sorry, this time slot was just booked. Please choose another time.")
        }

        if (!res.ok) {
            throw new Error(data.message || "something went wrong");
        }

        alert("Booking successful");
    } catch (err) {
        console.log(err);
        alert("Error booking session");
    }
});

formBtn[0].addEventListener("click", () => {
    page[3].classList.remove("active");
    page[2].classList.add("active");
});

function render() {
    const state = formData();

    durationText.forEach((value) => {
        value.textContent = state.dText || "";
    });

    if (state.duration?.includes("60")) {
        durationIndicator.forEach((indicator) => {
            indicator.textContent = "1 hr";
            bodyDuration.textContent = "1 hr";
        });
    } else {
        durationIndicator.forEach((indicator) => {
            indicator.textContent = "30 min";
            bodyDuration.textContent = "30 min";
        });
    }
    fullDate.textContent = `${state.timeRange}, ${state.dayString} ${state.dateString}`;
}

render();


