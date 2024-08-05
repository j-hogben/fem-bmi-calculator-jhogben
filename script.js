const calculatorForm = document.querySelector("#BMICalculator");
const unitSelectSection = document.querySelector("#unitSelection");
const allRadioButtons = document.querySelectorAll('input[name="formUnits"]');
const metricForm = document.querySelector("#metric-form");
const imperialForm = document.querySelector("#imperial-form");

const resultsSection = document.querySelector("#resultsSection");
const BMIResult = document.querySelector("#BMIResult");
const weightDescription = document.querySelector("#weightDescription");
const idealWeightRange = document.querySelector("#idealWeightRange");

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ HIDE RESULTS SECTION IF VISIBLE ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const hideResultsIfVisible = () => {
  if (!resultsSection.classList.contains("hiddens")) {
    resultsSection.classList.add("hidden");
  }
};

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ BMI CALCULATOR ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const calculateBMI = () => {
  // DETERMINING BMI CLASSIFICATION
  const BMIScaleDescription = (BMIResult) => {
    const BMIScale = [
      { max: 18.4, description: "underweight" },
      { max: 24.9, description: "healthy weight" },
      { max: 29.9, description: "overweight" },
      { max: 39.9, description: "obese" },
      { max: Infinity, description: "severely obese" },
    ];

    // RETURN STRING OF RELEVANT BMI VALUE
    for (const scale of BMIScale) {
      if (BMIResult <= scale.max) {
        return `in the ${scale.description} range`;
      }
    }
  };

  // FUNCTION FOR CALCULATING IMPERIAL BMI RESULTS
  const calculateBMIImperial = () => {
    // FUNCTIONS CONVERTING IMPERIAL TO METRIC AND BACK
    const inchToMeters = (feet, inches) => (feet * 12 + inches) * 0.0254;
    const lbsToKg = (stone, lbs) => (stone * 14 + lbs) / 2.20462;
    const kgToLbs = (kgs) => {
      const allLbs = kgs * 2.20462;
      const stone = Math.floor(allLbs / 14);
      const lbs = (allLbs % 14).toFixed();
      return { stone: stone, lbs: lbs };
    };
    // - - - - - - - - - - - - - - - - - - - - - - -
    const heightFt =
      parseInt(calculatorForm.querySelector("#heightFt").value) || 0;
    const heightIn =
      parseInt(calculatorForm.querySelector("#heightIn").value) || 0;
    const massSt = parseInt(calculatorForm.querySelector("#massSt").value) || 0;
    const massLb = parseInt(calculatorForm.querySelector("#massLb").value) || 0;
    // - - - - - - - - - - - - - - - - - - - - - - -
    // CONVERT IMPERIAL TO METRIC FOR CALCULATIONS
    const heightM = inchToMeters(heightFt, heightIn);
    const heightsquared = Math.pow(heightM, 2);
    const massKg = lbsToKg(massSt, massLb);
    // - - - - - - - - - - - - - - - - - - - - - - -
    // BMI CALCULATIONS
    const BMIResult = (massKg / heightsquared).toFixed(1);
    const rangeLower = (18.5 * heightsquared).toFixed(1);
    const rangeHigher = (24.9 * heightsquared).toFixed(1);
    // - - - - - - - - - - - - - - - - - - - - - - -
    // CONVERT RELEVANT TOTALS BACK TO IMPERIAL
    const idealRangeLower = kgToLbs(rangeLower);
    const idealRangeHigher = kgToLbs(rangeHigher);

    // FILL OBJECT WITH RESULTS TOTALS AND RETURN
    return {
      BMIResult: BMIResult,
      weightDescription: BMIScaleDescription(BMIResult),
      idealWeightRange: `${idealRangeLower.stone}st ${idealRangeLower.lbs}lbs - ${idealRangeHigher.stone}st ${idealRangeHigher.lbs}lbs`,
    };
  };

  // FUNCTION FOR CALCULATING METRIC BMI RESULTS
  const calculateBMIMetric = () => {
    const heightCm =
      parseFloat(calculatorForm.querySelector("#heightCm").value) || 0;
    const heightM = heightCm / 100;
    const heightsquared = Math.pow(heightM, 2);
    const mass = parseFloat(calculatorForm.querySelector("#massKg").value) || 0;
    // - - - - - - - - - - - - - - - - - - - - - - -
    // BMI CALCULATIONS
    const BMIResult = (mass / heightsquared).toFixed(1);
    const idealRangeLower = (18.5 * heightsquared).toFixed(1);
    const idealRangeHigher = (24.9 * heightsquared).toFixed(1);

    // FILL OBJECT WITH RESULTS TOTALS AND RETURN
    return {
      BMIResult: BMIResult,
      weightDescription: BMIScaleDescription(BMIResult),
      idealWeightRange: `${idealRangeLower}kgs - ${idealRangeHigher}kgs`,
    };
  };

  // CHECK WHICH UNIT IS SELECTED...
  const selectedUnit = unitSelectSection.querySelector(
    'input[type="radio"]:checked',
  ).value;

  // ...THEN RETURN THE APPROPRIATE BMI CALCULATIONS
  if (selectedUnit === "metric") {
    return calculateBMIMetric();
  } else {
    return calculateBMIImperial();
  }
};

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ FORMAT CERTAIN NUMBERS ON INPUT ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

document.addEventListener("DOMContentLoaded", () => {
  const numbersToFormat = calculatorForm.querySelectorAll(".format-input");

  /* ON INPUT, FORMAT FIELD VALUE BY REMOVING ANY CHARACTER OTHER THAN DIGITS 
  AND ONE DECIMAL POINT */
  numbersToFormat.forEach((number) => {
    number.addEventListener("input", (event) => {
      let input = event.target;
      let value = input.value.replace(/[^\d]/g, "");

      if (input.classList.contains("decimal-allowed")) {
        value = input.value.replace(/[^\d.]/g, "");

        // MATCH ADDS ALL (IN THIS CASE DECIMAL POINTS) TO AN ARRAY
        let decimalCount = (value.match(/\./g) || []).length;
        /* THEN IF THAT ARRAY HAS A LENGTH OF MORE THAN ONE, REMOVES SUBSEQUENT 
        DECIMAL POINTS ON INPUT */
        if (decimalCount > 1) {
          value = value.replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
        }
      }

      input.value = value;
    });
  });
});

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CHANGE TEXT IN RESULTS SECTION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const updateResultsText = () => {
  const calculationResults = calculateBMI();
  // ASSIGN RESULTS TO HTML RESULTS SECTION
  BMIResult.textContent = calculationResults.BMIResult;
  weightDescription.textContent = calculationResults.weightDescription;
  idealWeightRange.textContent = calculationResults.idealWeightRange;

  // IF THERE ARE NO RESULTS AND RESULTS SECTION IS VISIBLE, HIDE IT
  if (
    BMIResult.textContent !== "" &&
    weightDescription.textContent !== "" &&
    idealWeightRange.textContent !== ""
  ) {
    resultsSection.classList.remove("hidden");
  } else {
    hideResultsIfVisible();
  }
};

// WHEN AN INPUT IS CHANGED AND NAVIGATED AWAY FROM, UPDATE RESULTS
calculatorForm.addEventListener("change", () => {
  updateResultsText();
});

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CHANGE VISIBLE FORM SECTION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// CHANGE VISIBLE FORM SECTION DEPENDING ON WHICH RADIO BUTTON IS CHECKED
const toggleVisibleFormSection = (selectedUnit) => {
  if (selectedUnit === "imperial") {
    hideResultsIfVisible();
    metricForm.classList.add("hidden");
    imperialForm.classList.remove("hidden");
  } else {
    hideResultsIfVisible();
    imperialForm.classList.add("hidden");
    metricForm.classList.remove("hidden");
  }
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
