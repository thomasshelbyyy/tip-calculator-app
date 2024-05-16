const input = document.querySelector(".input");
const inputContainer = document.querySelector(".input-container");
const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip");
const tipInput = document.getElementById("tip");
const personAmountInput = document.getElementById("people");
const resetButton = document.querySelector(".reset-btn")

const errorMessage = document.querySelector(".error-message")
const personInputContainer = document.querySelector(".person-input-container")
const tipPerPersonDisplay = document.getElementById("tip-per-person");
const totalPerPersonDisplay = document.getElementById("total-per-person");

let tipPercent = 0;

const getBillValues = () => {
    const totalBill = parseFloat(billInput.value) || 0;
    const amountPerson = parseInt(personAmountInput.value) || 1;
    return { totalBill, amountPerson };
};

const calculateBillPerPerson = () => {
    const { totalBill, amountPerson } = getBillValues();
    return totalBill / amountPerson;
};

const countTipPerPerson = (billPerPerson) => {
    return (billPerPerson * tipPercent) / 100;
};

const countTotalPerPerson = () => {
    const billPerPerson = calculateBillPerPerson();
    const tipPerPerson = countTipPerPerson(billPerPerson);
    return billPerPerson + tipPerPerson;
};

tipButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        tipPercent = parseFloat(btn.value) || 0;
        updateResults();
    });
});

tipInput.addEventListener("input", function () {
    tipPercent = parseFloat(tipInput.value) || 0;
    updateResults();
});

personAmountInput.addEventListener("input", function () {
    updateResults();
    if (personAmountInput.value.length === 0 || personAmountInput.value == 0) {
        errorMessage.textContent = "The person cannot be zero"
        errorMessage.classList.add("active")
        personInputContainer.classList.add("error")
    } else {
        errorMessage.classList.remove("active")
        personInputContainer.classList.remove("error")
    }
});

billInput.addEventListener("input", function () {
    updateResults();
});

const updateResults = () => {
    const billPerPerson = calculateBillPerPerson();
    const tipPerPerson = countTipPerPerson(billPerPerson);
    const totalPerPerson = billPerPerson + tipPerPerson;

    tipPerPersonDisplay.textContent = tipPerPerson.toFixed(2);
    totalPerPersonDisplay.textContent = totalPerPerson.toFixed(2);
};

resetButton.addEventListener("click", function () {
    billInput.value = 0
    personAmountInput.value = 0
    tipPerPersonDisplay.textContent = "0.00"
    totalPerPersonDisplay.textContent = "0.00"
})

input.addEventListener("focus", function () {
    inputContainer.classList.add("focus");
});

input.addEventListener("blur", function () {
    inputContainer.classList.remove("focus");
});

personAmountInput.addEventListener("focus", function () {
    document.querySelector(".person-input-container").classList.add("focus")
})
personAmountInput.addEventListener("blur", function () {
    document.querySelector(".person-input-container").classList.remove("focus")
})

// Initialize with default values
updateResults();
