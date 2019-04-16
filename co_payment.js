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
      /// Retrieve the field/value pairs for the URL
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

      /// Calls the validateNumber() function whenever the user enters data into the cardNumber field
      document.getElementById("cardNumber").oninput = validateNumber;
});

// Func: Runs validation tests when the submit button is clicked
function runSubmit() {
      /// Validates the cardName field
      validateName();

      /// Validates the credit card option
      validateCredit();
}

// Func: Validates the credit card CVC number
function validateCVC() {

}

// Func: Validates that the user has selected the expiration month of the credit card
function validateMonth() {

}

// Func: Validates that the user has selected the expiration year of the credit card
function validateYear() {

}

// Func: Validates that the user has entered a valid and legitimate card number
function validateNumber() {
      var cardNumber = document.getElementById("cardNumber");

      // If: Displays the following error message if the customer leaves the card number field blank
      if (cardNumber.validity.valueMissing) {
            /// Displays the following error message if the customer leaves the card number field blank
            cardNumber.setCustomValidity("Enter your card number");
      }
      // Else: Tests for a pattern mismatch
      else if (cardNumber.validity.patternMismatch) {
            /// Displays the following error message if the customer enters a credit card number that does not match the correct pattern
            cardNumber.setCustomValidity("Enter a valid card number");
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

}

// Func: Returns true ff idNum satisfies the Luhn Algorithm
function luhn(idNum) {

}