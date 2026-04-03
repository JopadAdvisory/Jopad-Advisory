const API_URL = "https://jopad-backend.onrender.com";
const durationButton = document.querySelectorAll(".duration");
const dateButtons = document.querySelectorAll(".date-btn");
const durationText = document.querySelectorAll(".duration-text");
const durationIndicator = document.querySelectorAll(".duration-indicator");
const page = document.getElementsByTagName("section");
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
            dText: btn.textContent,
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

        const disabledDates = bookings.map(booking => {
            const date = new Date(booking.startTime);
            return date.toISOString().split("T")[0];
        });

        flatpickr("#date-picker", {
            inline: true,
            minDate: "today",
            maxDate: new Date().fp_incr(365),
            disable: disabledDates,
            disableMobile: "true",

            onChange: function(selectedDates) {
                const selectedDate = selectedDates[0];
                setFormData({
                    date: selectedDates
                });

                const state = formData();

                const allSlots = generateTimeSlots(state.duration);

                const availableSlots = filterAvailableSlots(allSlots, bookings, selectedDate);

                renderTimeSlots(availableSlots);
            }
        });
    } catch (err) {
        console.log("Error loading bookings:", err);
    }
}


initDatePicker();

function generateTimeSlots(duration) {
    const slots = [];

    const startHour = 9;
    const endHour = 17;

    let current = new Date();
    current.setHours(startHour, 0, 0, 0);

    let end = new Date();
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

function filterAvailableSlots(slots, bookings, selectedDates) {
    return slots.filter(slot => {
        return !bookings.some(booking => {
            const bookingDate = new Date(booking.startTime);

            return (
                bookingDate.toDateString() === 
                selectedDates.toDateString() && 
                bookingDate.getTime() === 
                slot.getTime()
            );
        });
    });
}

function renderTimeSlotes(slots) {
    const container = document.getElementById("time-slots");
}

dateButtons[0].addEventListener("click", () => {
    page[0].classList.add("active");
    page[1].classList.remove("active");
});

dateButtons[1].addEventListener("click", () => {
    page[1].classList.remove("active");
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
        });
    } else {
        durationIndicator.forEach((indicator) => {
            indicator.textContent = "30 min";
        });
    }
}

render();



