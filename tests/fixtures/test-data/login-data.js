// Exporting login test data and expected error messages
module.exports = {
  // Valid user credentials for successful login
  validUser: {
    email: "demouser1@gmail.com",
    password: "User@1234",
  },

  // Invalid user credentials for negative test case
  invalidUser: {
    email: "invalid@example.com",
    password: "invalidpass",
  },

  // Email field left empty for validation test
  emptyEmail: {
    email: "",
    password: "User@1234",
  },

  // Password field left empty for validation test
  emptyPassword: {
    email: "demouser1@gmail.com",
    password: "",
  },

  // Function to get the expected URL after login
  verifyUrl: (page) => {
    const baseUrl = page.context()._options.baseURL; // Get baseURL from Playwright config
    return {
      expectedUrl: `${baseUrl}/my-account/`, // Expected redirect URL after login
    };
  },

  // Expected error messages for different validation scenarios
  errorMessage: {
    invalidEmail: "Unknown email address. Check again or try your username.", // Shown for invalid login
    emptyPassword: "Error: The password field is empty.", // Shown when password is missing
    emptyEmail: "Error: Username is required.", // Shown when email is missing
  },
};
