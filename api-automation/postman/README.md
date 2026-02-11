# API Testing Documentation

## Getting Started with Postman Collections

This section contains comprehensive API test suites using Postman collections and Newman for automation.

## 📁 Folder Structure

```
api-automation/postman/
├── collections/        # Postman collection files (.json)
├── environments/       # Environment configurations
├── test-data/         # API test data and fixtures
├── reports/           # Test execution reports
└── newman-scripts/    # Automation scripts
```

## 🚀 Setting Up API Tests

### Prerequisites
- **Postman** (for collection development)
- **Newman** (for command-line execution)
- **Node.js** (for Newman installation)

### Installation
```bash
# Install Newman globally
npm install -g newman

# Navigate to API automation folder
cd api-automation/postman
```

## 📊 Collections Overview

### Planned Collections
- **Authentication API** - Login, logout, token management
- **User Management API** - CRUD operations, profile management
- **E-commerce API** - Product catalog, cart, checkout
- **Error Handling** - Validation and edge cases

### Running Collections

**Single Collection:**
```bash
newman run collections/ecommerce-api.json -e environments/staging.json
```

**All Collections:**
```bash
newman run collections/*.json -e environments/staging.json --reporters cli,html
```

**With Custom Reports:**
```bash
newman run collections/ecommerce-api.json \
  -e environments/staging.json \
  --reporters html \
  --reporter-html-export reports/api-test-report.html
```

## 🔧 Environment Configuration

### Environment Files
- `local.postman_environment.json` - Local development
- `staging.postman_environment.json` - Staging environment  
- `production.postman_environment.json` - Production (read-only tests only)

### Environment Variables
- `baseUrl` - API base URL
- `authToken` - Authentication token
- `userId` - Test user ID
- `timeout` - Request timeout values

## 📝 Test Data Management

### Test Data Files
- `test-users.json` - User account data
- `product-data.json` - Product information
- `mock-responses.json` - Expected API responses

## 🎯 Best Practices Implemented

- **Data-driven testing** using CSV/JSON data files
- **Environment-specific configurations** for different deployment stages
- **Pre-request scripts** for authentication and setup
- **Test scripts** for comprehensive validation
- **Custom assertions** for business logic validation
- **Error handling** and negative test scenarios

## 📊 Reporting

Newman generates multiple report formats:
- **CLI output** - Real-time test execution
- **HTML reports** - Detailed browser-viewable results
- **JSON reports** - Machine-readable for CI/CD integration
- **JUnit XML** - For continuous integration tools

---

*Note: This is a placeholder documentation. Actual Postman collections and API tests will be added to demonstrate comprehensive API testing capabilities.*