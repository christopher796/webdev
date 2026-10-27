// STEP 2: Grab references to DOM elements
const form = document.getElementById('regform');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const genderInput = document.getElementById('gender');
const dobInput = document.getElementById('dob');
const countryInput = document.getElementById('country');
const phoneInput = document.getElementById('phone');
const bioInput = document.getElementById('bio');

// Error spans
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');
const genderError = document.getElementById('genderError');
const dobError = document.getElementById('dobError');
const countryError = document.getElementById('countryError');
const phoneError = document.getElementById('phoneError');
const bioError = document.getElementById('bioError');

// Other UI elements
const successMsg = document.getElementById('successMsg');
const memberList = document.getElementById('memberList');
const emptyNote = document.getElementById('emptyNote');
const countDisplay = document.getElementById('count');
const themeBtn = document.getElementById('theme');

// Log them to the console to confirm they are all found
console.log("All Elements Grabbed:", {
    form, nameInput, emailInput, passwordInput, confirmPasswordInput, 
    genderInput, dobInput, countryInput, phoneInput, bioInput,
    nameError, emailError, passwordError, confirmError, genderError, 
    dobError, countryError, phoneError, bioError,
    successMsg, memberList, emptyNote, countDisplay, themeBtn
});

let memberCount = 0; 

// STEP 3: Capture the form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    successMsg.classList.add('hidden');
    let isValid = true;

    // Helper function to show errors and add the red CSS border
    function showError(input, errorSpan, message) {
        errorSpan.textContent = message;
        input.classList.add('invalid');
        isValid = false;
    }

    // Helper function to clear errors
    function clearError(input, errorSpan) {
        errorSpan.textContent = '';
        input.classList.remove('invalid');
    }

    // STEP 4: Validate each field
    // Name
    if (nameInput.value.trim() === '') showError(nameInput, nameError, 'Full name is required.');
    else clearError(nameInput, nameError);

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) showError(emailInput, emailError, 'Valid email is required.');
    else clearError(emailInput, emailError);

    // Password
    if (passwordInput.value.length < 6) showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
    else clearError(passwordInput, passwordError);

    // Confirm Password
    if (confirmPasswordInput.value !== passwordInput.value || confirmPasswordInput.value === '') {
        showError(confirmPasswordInput, confirmError, 'Passwords do not match.');
    } else clearError(confirmPasswordInput, confirmError);

    // Gender
    if (genderInput.value === '') showError(genderInput, genderError, 'Please select a gender.');
    else clearError(genderInput, genderError);

    // Date of Birth
    if (dobInput.value === '') showError(dobInput, dobError, 'Date of birth is required.');
    else clearError(dobInput, dobError);

    // Country
    if (countryInput.value.trim() === '') showError(countryInput, countryError, 'Country is required.');
    else clearError(countryInput, countryError);

    // Phone
    if (phoneInput.value.trim() === '') showError(phoneInput, phoneError, 'Phone number is required.');
    else clearError(phoneInput, phoneError);

    // Bio
    if (bioInput.value.trim().length < 10) showError(bioInput, bioError, 'Bio must be at least 10 characters.');
    else clearError(bioInput, bioError);

    // Stop execution if validation fails
    if (!isValid) return;

    // STEP 6: Register the member (DOM creation)
    if (emptyNote) emptyNote.style.display = 'none';

    const li = document.createElement('li');
    li.className = 'member-item';
    
    // MATCHING YOUR CSS CLASSES: .info and .remove
    li.innerHTML = `
        <div class="info">
            <strong>${nameInput.value}</strong>
            <span>${emailInput.value} | ${countryInput.value}</span>
        </div>
        <button class="remove">Remove</button>
    `;

    // STEP 9: Remove a member
    const removeBtn = li.querySelector('.remove');
    removeBtn.addEventListener('click', function() {
        li.remove();
        memberCount--;
        updateCounter();
        
        if (memberCount === 0 && emptyNote) {
            emptyNote.style.display = 'block';
        }
    });

    memberList.appendChild(li);
 
    // STEP 7: Update the member counter
    memberCount++;
    updateCounter();

    // STEP 8: Show the success message and reset
    successMsg.textContent = `Success! ${nameInput.value} has been registered.`;
    successMsg.classList.remove('hidden');
    
    form.reset();
    clearAllErrors();

    // Hide success message after 3 seconds
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 3000);
});

// Function to update counter
function updateCounter() {
    countDisplay.textContent = memberCount;
}

// Function to clear all errors and red borders
function clearAllErrors() {
    document.querySelectorAll('.error').forEach(span => span.textContent = '');
    document.querySelectorAll('input, select, textarea').forEach(input => input.classList.remove('invalid'));
}

// STEP 5: Clear errors as the user fixes them
const allInputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, genderInput, dobInput, countryInput, phoneInput, bioInput];
const allErrors = [nameError, emailError, passwordError, confirmError, genderError, dobError, countryError, phoneError, bioError];

allInputs.forEach((input, index) => {
    // When the user types or changes a field, clear that specific error
    input.addEventListener('input', () => {
        allErrors[index].textContent = '';
        input.classList.remove('invalid');
    });
    // For dropdowns and date pickers
    input.addEventListener('change', () => {
        allErrors[index].textContent = '';
        input.classList.remove('invalid');
    });
});

// STEP 10: Dark Mode toggle
themeBtn.addEventListener('click', function() {
    // Toggle the 'dark' class on body (Matching your CSS)
    document.body.classList.toggle('dark');
    
    // Update button text
    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = 'Light Mode';
    } else {
        themeBtn.textContent = 'Dark Mode';
    }
});