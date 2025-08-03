<<<<<<< HEAD

# End-to-End Automation Framework with Playwright by adhering POM, Gherkin syntax with Playwright Steps & CI/CD👋


A scalable and modular test automation framework built with Playwright. It follows the Page Object Model (POM) design, uses Gherkin syntax with Playwright Steps API, and supports custom fixtures and filters. Integrated with Allure for detailed reporting and Jenkins for automated CI/CD test execution.


## Features

🔧 Project Overview

**1. End-to-End Test Automation with Playwright** -
Comprehensive test coverage across web applications using Playwright's robust automation capabilities.

**2. Scalable UI Test Automation with Playwright** -
Built for scalability and maintainability, suitable for large and growing test suites.

**3. Implemented Page Object Model (POM) Design Pattern** -
Promotes reusable, modular, and maintainable test architecture.

**4. Gherkin Syntax with Playwright Steps API** -
Tests are written in Gherkin format using Playwright’s Steps API and setup, enabling clear BDD-style scenarios and splitting long tests into manageable steps.

**5. Custom Fixtures for Test Reusability** -
Designed flexible, reusable custom fixtures for managing test-data and login setup.

**6. Custom Filters for Dynamic Test Control** -
Built-in filtering mechanisms to dynamically include/exclude tests based on tags.

**7. Integrated Allure Reporting** -
Generates detailed and interactive test reports for easy analysis and debugging.

**8. Jenkins CI/CD Integration for Automated Test Execution** -
Seamlessly integrated with Jenkins pipelines to support scheduled and event-driven test runs.

## ✅ Folder Structure

**specs/ →** Where all your .spec.ts files live; tests are structured using Playwright’s test.step() to simulate Gherkin-like readability.

**pages/ →** Contains POM classes (LoginPage.ts, DashboardPage.ts, etc.)

**fixtures/ →** Reusable Playwright fixtures (e.g., auth setup, test data injection)

**utils/ →** Helper methods and shared utilities

**steps/ →** Optional abstraction layer if you want to organize logic into step files

**playwright.config.ts →** Main config file for test runner, reporters, and project settings


## 📦 Install Commands

```bash
npm install
```

➡️ Installs all dependencies listed in `package.json`.

```bash
npm init playwright@latest
```

➡️ Bootstraps a Playwright project with default structure and setup.

```bash
npm install -D allure-playwright
```

➡️ Installs Allure reporting integration as a dev dependency.

```bash
npx playwright test
```

➡️ Runs your Playwright test suite.

```bash
npm run report:generate
```

➡️ Generates an Allure HTML report from test results.

---


**📁 Example package.json Scripts**

```bash

"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:debug": "npx playwright test --debug",
  "report:generate": "allure generate ./allure-results --clean -o ./allure-report",
  "report:open": "allure open ./allure-report",
  "clean:results": "rm -rf allure-results allure-report"
}

```

**💬 Custom scripts are defined in the package.json file to simplify common tasks. Please refer to it for available commands and usage.**

```bash
example - npm run test:headed
```

## 🎉 You're All Set!

You're now ready to run beautiful, scalable Playwright tests with rich reporting and CI integration.
Happy testing & may your bugs be shallow! 🐞🚀

=======
# playwright-opencart-tutorial
End-to-End Automation Framework with Playwright by adhering POM, Gherkin syntax with Playwright Steps &amp; CI/CD
>>>>>>> 0018c5998865f7ace4902fcaa51baf1ce09712e2
