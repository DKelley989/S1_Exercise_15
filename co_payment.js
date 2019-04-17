"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: Dylan Kelley
   Date:   4.11.19
   
   Filename: co_payment.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateMonth()
      Validates that the user has selected the expiration month of the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true if idNum satisfies the Luhn Algorithm

*/
/// Event listener to run the following anonymous function when the page loads
window.addEventListener('load', function () {
      /// Retrieves the field/value pairs for the URL
      var formData = location.search.slice(1);

      /// Replaces all "+" characters with blank spaces
      formData = formData.replace(/\+/g, " ");

      /// Decodes the field value back into its original values
      formData.decodeURIComponent(formData);

      /// Splits the data at each occurrence of the "&" or "=" character, creating the formFields array
      var formFields = formData.split(/[&=]/g);

      /// Writes the values stored in the formFields array to the specified fields in the order form
      document.forms.order.elements.orderDate.value = formFields[1];
      document.forms.order.elements.modelName.value = formFields[5];
      document.forms.order.elements.qty.value = formFields[7];
      document.forms.order.elements.initialCost.value = formFields[9];
      document.forms.order.elements.protectionName.value = formFields[13];
      document.forms.order.elements.protectionCost.value = formFields[15];
      document.forms.order.elements.subtotal.value = formFields[17];
      document.forms.order.elements.salesTax.value = formFields[19];
      document.forms.order.elements.totalCost.value = formFields[21];
});

/// Event listener to run the following anonymous function when the page loads
window.addEventListener('load', function () {
      /// Calls the runSubmit() function when the Submit Payment button is clicked
      document.getElementById("subButton").onclick = runSubmit;

      /// Calls the validateName() function when the user inputs data into the cardName field
      document.getElementById("cardName").oninput = validateName;

      /// Calls the validateNumber() function when the user enters data into the cardNumber field
      document.getElementById("cardNumber").oninput = validateNumber;

      /// Calls the validateMonth() function when the user changes the select option in the expMonth selection list
      document.getElementById("expMonth").onchange = validateMonth;

      /// Calls the validateYear() fucntion when the user changes the select option in the expYear selection list
      document.getElementById("expYear").onchange = validateYear;

      /// Calls the validateCVC() function when the user changes the field value
      document.getElementById("cvc").oninput = validateCVC;
});

// Func: Runs validation tests when the submit button is clicked
function runSubmit() {
      /// Validates the cardName field
      validateName();

      /// Validates the credit card option
      validateCredit();

      /// Validates the credit card number
      validateNumber();

      /// Validates that the expiration month has been selected
      validateMonth();

      /// Validates that the expiration year has been selected
      validateYear();

      /// Validates that the CVC number is a valid pattern for the selected card
      validateCVC();
}

// Func: Validates the credit card CVC number
function validateCVC() {
      // Var: Stores a reference to the cvc field
      var cardCVC = document.getElementById("cvc");

      // Var: Extracts the value of the currently selected credit card
      var creditCard = document.querySelector('input[name="credit"]:checked').value;

      // If: Tests whether a CVC number has been entered
      if (cardCVC.validity.valueMissing) {
            cardCVC.setCustomValidity("Enter your CVC number");
      }
      // Else: Tests whether a 4-digit CVC value was entered for the American Express card
      else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
            cardCVC.setCustomValidity("Enter a 4-digit CVC number");
      }
      // Else: Tests whether a 3-digit CVC value was entered for other credit cards
      else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
            cardCVC.setCustomValidity("Enter a 3-digit CVC number");
      }
      // Else: It is a valid pattern for the selected credit card
      else {
            cardCVC.setCustomValidity("");
      }
}

// Func: Validates that the user has selected the expiration month of the credit card
function validateMonth() {
      var cardMonth = document.getElementById("expMonth");

      // If: The user leaves the first entry in the selection list unchanged, then the entry will be flagged as invalid
      if (cardMonth.selectedIndex === 0) {
            cardMonth.setCustomValidity("Select the expiration month");
      }
      // Else: An entry in each selection list has been selected
      else {
            cardMonth.setCustomValidity("");
      }
}

// Func: Validates that the user has selected the expiration year of the credit card
function validateYear() {
      var cardYear = document.getElementById("expYear");

      // If: Checks if the user leaves the first entry in the selection list unchanged
      if (cardYear.selectedIndex === 0) {
            /// The entry will be flagged as invalid if the first entry in the selection list is unchanged
            cardYear.setCustomValidity("Select the expiration year");
      }
      // Else: An entry in each selection list has been selected
      else {
            cardYear.setCustomValidity("");
      }
}

// Func: Validates that the user has entered a valid and legitimate card number
function validateNumber() {
      var cardNumber = document.getElementById("cardNumber");

      // If: Tests if the customer leaves the card number field blank
      if (cardNumber.validity.valueMissing) {
            /// Displays the following error message if the customer leaves the card number field blank
            cardNumber.setCustomValidity("Enter your card number");
      }
      // Else: Tests for a pattern mismatch
      else if (cardNumber.validity.patternMismatch) {
            /// Displays the following error message if the customer enters a credit card number that does not match the correct pattern
            cardNumber.setCustomValidity("Enter a valid card number");
      }
      // Else: Tests whether the value of the cardNumber field passes the Luhn test
      else if (luhn(cardNumber.value) === false) {
            cardNumber.setCustomValidity("Enter a legitimate card number");
      }
      // Else: No message is displayed if the data is valid
      else {
            cardNumber.setCustomValidity("");
      }
}

// Func: Validates that the user has selected a credit card type
function validateCredit() {
      var creditCard = document.forms.payment.elements.credit[0];

      // If: Tests whether the user has selected an option button from the group
      if (creditCard.validity.valueMissing) {
            /// Displays the following custom validation message if no option button is selected
            creditCard.setCustomValidity("Select your credit card");
      }
      // Else: No error message is displayed if the credit card is selected
      else {
            creditCard.setCustomValidity("");
      }
}

// Func: Validates that the user has specified the name on the credit card
function validateName() {
      var cardName = document.getElementById("cardName");

      // If: Tests whether a value has been entered into the cardName field
      if (cardName.validity.valueMissing) {
            /// Displays the following message if no value has been entered
            cardName.setCustomValidity("Enter your name as it appears on the card");
      }
      // Else: Removes the validation message and defines the field data as valid
      else {
            cardName.setCustomValidity("");
      }
}

// Func: Sums the digits characters in a text string
function sumDigits(numStr) {
      // Var: Keeps a running total of the sum of the digits in the number string
      var digitTotal = 0;

      // For: Loops through every character in the number string
      for (var i = 0; i < numStr.length; i++) {
            /// Adds the integer vlaue of the character to digitTotal for every character in the number string
            digitTotal += parseInt(numStr.charAt(i));
      }

      /// Numeric sum of the digits in the string
      return digitTotal;
}

// Func: Returns true ff idNum satisfies the Luhn Algorithm
function luhn(idNum) {
      // Var: One set of digits
      var string1 = "";

      // Var: The set of that will be doubled
      var string2 = "";

      // For: Loops through the first group of digits starting with the last digit
      for (var i = idNum.length - 1; i >= 0; i -= 2) {
            /// Adds the alternating set of digit characters to string1
            string1 += idNum.charAt(i);
      }

      // For: Loops through the second group of digits starting with the second-to-last digit
      for (var i = idNum.length - 2; i >= 0; i -= 2) {
            /// Adds double the value of the digits to string2
            string2 += 2 * idNum.charAt(i);
      }

      /// Calls the sumDigits() function to return the sum of the digit characters in string1 and string2 and determine whether that sum is divisible by 10
      return sumDigits(string1 + string2) % 10 === 0;
}