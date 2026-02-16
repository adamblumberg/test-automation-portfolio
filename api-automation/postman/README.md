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

### Available Collections
- **Trello API** - Complete board management workflow with CRUD operations
  - Board creation and management
  - List operations (TODO, DONE)
  - Card creation and movement
  - Error state validation
  - End-to-end workflow testing

### Planned Collections
- **Authentication API** - Login, logout, token management
- **User Management API** - CRUD operations, profile management
- **E-commerce API** - Product catalog, cart, checkout
- **Error Handling** - Validation and edge cases

### Running Collections

**Trello API Collection:**
```bash
newman run "collections/Trello API.postman_collection.json" -e environments/trello-testing.json
```

**With Custom Reports:**
```bash
newman run "collections/Trello API.postman_collection.json" \
  -e environments/trello-testing.json \
  --reporters cli,html,json \
  --reporter-html-export reports/trello-api-report.html
```

**Using Newman Scripts:**
```bash
cd newman-scripts
npm run test:trello
```

**All Collections:**
```bash
newman run collections/*.json -e environments/staging.json --reporters cli,html
```

## � Jenkins CI/CD Integration

### **Automated Pipeline**
This project includes a **Jenkins CI/CD pipeline** that automatically runs the Trello API collection and generates comprehensive reports.

#### **Pipeline Features:**
- ✅ **Secure credential management** using Jenkins credentials store
- ✅ **Direct collection execution** from Postman API (no local files needed)
- ✅ **Multiple report formats** - HTML Extra and JUnit XML
- ✅ **Automated report publishing** in Jenkins UI
- ✅ **Test result tracking** with historical data

#### **Pipeline Stages:**
1. **Environment Setup** - Loads Postman API key from Jenkins credentials
2. **Collection Execution** - Runs Newman with enhanced HTML and JUnit reporting
3. **Report Publishing** - Makes reports accessible through Jenkins interface

#### **Running the Pipeline:**
- **Manual Trigger:** Jenkins dashboard → Build Now
- **Automated Triggers:** Can be configured for Git webhooks or scheduled runs

#### **Generated Reports:**
- **HTML Report:** `newman/report.html` - Interactive test results with detailed assertions
- **JUnit XML:** `newman/report.xml` - Test results for Jenkins test tracking
- **Console Output:** Real-time execution logs in Jenkins build console

#### **What Makes This Pipeline Special:**
- **API-based execution:** Runs collection directly from Postman cloud (collection ID: `3bc31dbb-fc12-409f-9f1a-3752c4672ff8`)
- **Enhanced reporting:** Uses `htmlextra` reporter for richer, more detailed HTML reports
- **Jenkins integration:** Full integration with Jenkins' built-in HTML publisher and JUnit result tracking
- **Credential security:** API keys stored securely in Jenkins credentials, not in code

### **Pipeline Configuration:**
The pipeline is defined in [`Jenkinsfile`](Jenkinsfile) and can be set up as:
- **Pipeline job** pointing to this repository
- **Multibranch pipeline** for automatic branch detection
- **Blue Ocean pipeline** for visual pipeline management

## �🔧 Environment Configuration

### Environment Files
- `trello-testing.json` - Trello API testing environment
- `local.postman_environment.json` - Local development
- `staging.postman_environment.json` - Staging environment  
- `production.postman_environment.json` - Production (read-only tests only)

### Trello API Setup

#### Getting Your API Credentials
1. **Get your Trello API Key:**
   - Visit: [https://trello.com/app-key](https://trello.com/app-key)
   - Copy your API Key

2. **Generate a Token:**
   - On the same page, click "Generate a Token"
   - Choose appropriate permissions (read/write for testing)
   - Copy your Token

3. **Update Environment File:**
   - Edit `environments/trello-testing.json`
   - Replace `YOUR_TRELLO_KEY_HERE` with your API key
   - Replace `YOUR_TRELLO_TOKEN_HERE` with your token

#### Trello API Documentation
- **Official API Docs:** [https://developer.atlassian.com/cloud/trello/rest/](https://developer.atlassian.com/cloud/trello/rest/)
- **Authentication Guide:** [https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/)

### Environment Variables
- `baseUrl` - API base URL
- `trelloKey` - Trello API key (required for Trello collection)
- `trelloToken` - Trello API token (required for Trello collection)
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

## 🔗 Quick Links

- [Jenkins Pipeline Configuration](Jenkinsfile) - Complete CI/CD setup
- [Trello API Key Setup](https://trello.com/app-key) - Get your API credentials
- [Trello API Documentation](https://developer.atlassian.com/cloud/trello/rest/) - Official API docs
- [Newman Documentation](https://www.npmjs.com/package/newman) - Command-line runner
- [Postman Collection Format](https://schema.postman.com/) - Collection schema reference

*🚀 Complete API testing solution with CI/CD automation! The Jenkins pipeline demonstrates professional DevOps practices with automated testing, secure credential management, and comprehensive reporting.*