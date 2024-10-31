const requiredFields = document.querySelectorAll('input[required], select[required]');

requiredFields.forEach(input => {
    input.addEventListener('focusout', event => {
        // required checking
        event.target.value ? input.classList.remove('error-input') : input.classList.add('error-input');
        if (input.checkValidity()) {
            input.classList.remove('error-input');
            input.classList.add('valid-input')
        } else {
            input.classList.remove('valid-input');
            input.classList.add('error-input')
        }
    });
});

const buttonStates = document.querySelectorAll('.button-state');
buttonStates.forEach(button => {
    button.addEventListener('click', (event) => {
        // No checking if prev button is pressed
        let checkNecessary = event.target.value != 'previous' ? checkSection(stepName[currentStep].stepId) : true;
        // check validity of current section
        if (checkNecessary) {
            if (event.target.value == 'next'){
                currentStep + 1 < stepName.length ? currentStep++ : null;
            } else {
                currentStep - 1 > -1 ? currentStep-- : null;
            }
            load(stepName[currentStep]);
        } 
        
    });
});


let currentStep = 0;

// States
// 0 - Hidden
// 1 - Enabled
const stepName = [
    { stepNo:1, stepname:"Personal Information", stepId: "personal-info", prevButton: 0, nextButton: 1, submitButton: 0},
    { stepNo:2, stepname:"Financial Information", stepId: "financial-info" , prevButton: 1, nextButton: 1, submitButton: 0},
    { stepNo:3, stepname:"Investment Profile", stepId: "investment-profile", prevButton: 1, nextButton: 1, submitButton: 0},
    { stepNo:4, stepname:"Terms and Conditions", stepId: "terms-conditions", prevButton: 1, nextButton: 0, submitButton: 1}
]

const load = (step) => {
    // set header title
    document.getElementById("current-step").innerHTML = `${step.stepNo} : ${step.stepname}`;

    // reset button states
    document.getElementById("next-button").classList.remove("active", "disabled");
    document.getElementById("previous-button").classList.remove("active", "disabled");
    document.getElementById("submit-button").classList.remove("active", "disabled");

    // set button states
    step.prevButton ? document.getElementById("previous-button").classList.add("active") : document.getElementById("previous-button").classList.add("disabled");
    step.nextButton ? document.getElementById("next-button").classList.add("active") : document.getElementById("next-button").classList.add("disabled");
    step.submitButton ? document.getElementById("submit-button").classList.add("active") : document.getElementById("submit-button").classList.add("disabled");

    // set fieldset states
    const sections = document.querySelectorAll('fieldset');
    sections.forEach(section => {
        if (section.id == step.stepId) {
            section.classList.add("active");
            section.classList.remove("disabled");
        } else {
            section.classList.add("disabled");
            section.classList.remove("active");
        }
    });
};

const checkSection = (stepId) => {
    const inputField = document.getElementById(stepId).querySelectorAll("input, select");
    let state = true
   
    for (const el of inputField) {
      
        if(!el.checkValidity()) {
            el.dispatchEvent(new Event("focusout"));
            // show the error of the first field 
            state ? el.reportValidity() : null;
            
            state = false;
        }
    }
    return state;
}

// initial load
load(stepName[0])