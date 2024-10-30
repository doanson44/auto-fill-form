document.addEventListener("DOMContentLoaded", function() {
  const fillDataBtn = document.getElementById("fillDataBtn");
  const fillLoginBtn = document.getElementById("fillLoginBtn");

  // Helper function to execute a script in the active tab
  const executeScriptInActiveTab = (fn) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: fn
      });
    });
  };

  // Event listeners
  if (fillDataBtn) {
    fillDataBtn.addEventListener("click", () => executeScriptInActiveTab(fillRandomData));
  } else {
    console.error("Button with ID 'fillDataBtn' not found.");
  }

  if (fillLoginBtn) {
    fillLoginBtn.addEventListener("click", () => executeScriptInActiveTab(fillLoginData));
  } else {
    console.error("Button with ID 'fillLoginBtn' not found.");
  }
});

// Function to fill login data
function fillLoginData() {
  function change(element, value = ' ') {
    const o = {
      code: value === ' ' ? 'Space' : value.toUpperCase(),
      key: value,
      keyCode: value.charCodeAt(0),
      which: value.charCodeAt(0)
    };
    element.value = value;
    element.dispatchEvent(new KeyboardEvent('keydown', o));
    element.dispatchEvent(new KeyboardEvent('keyup', o));
    ['change', 'input'].forEach(eventType => {
      element.dispatchEvent(new Event(eventType, { bubbles: true }));
    });
  }

  const passwordField = document.querySelector("#basic_password");

  // Retrieve the stored username from localStorage
  const storedUsername = localStorage.getItem('storedUsername');
  const userField = document.querySelector("#basic_user");

  if (userField && storedUsername) {
    change(userField, storedUsername); // Fill with stored username
    
    // Remove the stored username from localStorage
    localStorage.removeItem('storedUsername');
    console.log("Stored username removed.");
  }

  if (passwordField) change(passwordField, 'Dalry@1999');
}

// Function to fill random registration data
function fillRandomData() {
  function change(element, value = ' ') {
    const o = {
      code: value === ' ' ? 'Space' : value.toUpperCase(),
      key: value,
      keyCode: value.charCodeAt(0),
      which: value.charCodeAt(0)
    };
    element.value = value;
    element.dispatchEvent(new KeyboardEvent('keydown', o));
    element.dispatchEvent(new KeyboardEvent('keyup', o));
    ['change', 'input'].forEach(eventType => {
      element.dispatchEvent(new Event(eventType, { bubbles: true }));
    });
  }

  const emailDomains = ["gmail.com", "outlook.com", "stdapp.com"];
  const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)]; // Select a random domain
  const randomUsername = Math.random().toString(36).substring(2, 10); // Generate a random string for username
  const randomEmail = `${randomUsername}@${randomDomain}`; // Create email using random username and domain

  const emailField = document.querySelector("#basic_email");
  const usernameField = document.querySelector("#basic_username");
  const passwordField = document.querySelector("#basic_password");
  const confirmPasswordField = document.querySelector("#basic_confirm_password");
  const referralCodeField = document.querySelector("#basic_referral_code");

  if (emailField) change(emailField, randomEmail);
  if (usernameField) change(usernameField, randomUsername);
  if (passwordField) change(passwordField, 'Dalry@1999');
  if (confirmPasswordField) change(confirmPasswordField, 'Dalry@1999');
  if (referralCodeField) change(referralCodeField, 'blpACxjI7JXW5FL');

   // Store the username for later use
   localStorage.setItem('storedUsername', randomUsername);
}
