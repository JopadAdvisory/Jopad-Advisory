const durationButton = document.querySelectorAll(".duration");
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


flatpickr("#date-picker", {
    inline: true,
    minDate: "today",
    maxDate: new Date().fp_incr(365),
    onChange: function(selectedDates) {
        setFormData({
            date: selectedDates[0]
        })
    }
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
        durationIndicator.textContent = "30 min";
    }
}

render();



