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
        setFormData({...formData, duration: btn.textContent});
        page[0].classList.remove("active");
        page[1].classList.add("active");
    })
});

render();

function render() {
    durationText[0].textContent = formData().duration;
    if (durationText[0].textContent.includes("60")) {
        durationIndicator[0].textContent = "1 hr";
    } else {
        durationIndicator[0].textContent = "30 min";
    }
}

flatpickr("#date-picker", {
    inline: true,
    minDate: "today",
    maxDate: new Date().fp_incr(365)
});



