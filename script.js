const calculatorForm = document.querySelector("#BMICalculator");
const unitSelectSection = document.querySelector("#unitSelection");
const allRadioButtons = document.querySelectorAll('input[name="formUnits"]');
const metricForm = document.querySelector("#metric-form");
const imperialForm = document.querySelector("#imperial-form");

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CHANGE VISIBLE FORM SECTION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// CHANGE VISIBLE FORM SECTION DEPENDING ON WHICH RADIO BUTTON IS CHECKED
const toggleVisibleFormSection = (selectedUnit) => {
  if (selectedUnit === "imperial") {
    metricForm.classList.add("hidden");
    imperialForm.classList.remove("hidden");
  } else if (selectedUnit === "metric") {
    imperialForm.classList.add("hidden");
    metricForm.classList.remove("hidden");
  } else console.log("Error! Oh dear!");
};

// WHEN A RADIO BUTTON IS CHECKED, RESET CALCULATOR FORM AND TOGGLE VISIBLE SECTIONS
allRadioButtons.forEach((button) => {
  button.addEventListener("change", (e) => {
    calculatorForm.reset();
    toggleVisibleFormSection(e.target.value);
  });
});

// CHECK WHICH RADIO BUTTON UNIT IS CHECKED ON PAGE LOAD AND SWITCH SECTIONS ACCORDINGLY
const initialUnitSelected = unitSelectSection.querySelector(
  'input[type="radio"]:checked',
).value;
toggleVisibleFormSection(initialUnitSelected);

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////
