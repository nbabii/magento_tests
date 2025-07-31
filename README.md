# Magento E2E Tests Demo

This repository contains end-to-end tests for the Magento shop using Playwright and TS.   
To run tests Node.js should be installed

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

To run all tests:
```bash
npm test
```

## Bonuses
- Added handler using `addLocatorHandler` to catch when ad showed and close it.
- Added `prettier` for code formatting
- Added `chance` library to generate random test data