# Playwright CLI Demo

This demonstrates how to use the Playwright CLI to interact with web pages directly from the command line.

## Basic Commands Demo

### 1. Open Browser and Navigate
```bash
# Open browser in headed mode (visible)
npx @playwright/cli@latest open https://ecommerce-playground.lambdatest.io --headed

# Navigate to a different URL
npx @playwright/cli@latest goto https://ecommerce-playground.lambdatest.io/index.php?route=product/search
```

### 2. Interact with Elements
```bash
# Take a snapshot to see page elements and get references
npx @playwright/cli@latest snapshot

# Type in search field (use actual element reference from snapshot)
npx @playwright/cli@latest type "iPhone"

# Press Enter to search
npx @playwright/cli@latest press Enter

# Click on first search result (use element reference)
npx @playwright/cli@latest click "your_element_reference"
```

### 3. Capture Evidence
```bash
# Take screenshot of current page
npx @playwright/cli@latest screenshot --filename=search-results.png

# Take screenshot of specific element
npx @playwright/cli@latest screenshot element_reference --filename=product-details.png

# Save page as PDF
npx @playwright/cli@latest pdf --filename=page.pdf
```

### 4. Browser Session Management
```bash
# List all active sessions
npx @playwright/cli@latest list

# Open multiple sessions for different tasks
npx @playwright/cli@latest -s=shopping open https://ecommerce-playground.lambdatest.io
npx @playwright/cli@latest -s=admin open https://admin.example.com

# Switch between sessions
npx @playwright/cli@latest -s=shopping goto https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
npx @playwright/cli@latest -s=admin type "admin_credentials"

# Close specific session
npx @playwright/cli@latest -s=shopping close

# Close all sessions
npx @playwright/cli@latest close-all
```

### 5. Storage and State Management
```bash
# Save authentication state after login
npx @playwright/cli@latest state-save auth-state.json

# Load saved state in new session
npx @playwright/cli@latest state-load auth-state.json

# Manage cookies
npx @playwright/cli@latest cookie-list
npx @playwright/cli@latest cookie-set "session_id" "abc123"
npx @playwright/cli@latest cookie-delete "temp_cookie"
```

### 6. Testing and Debugging
```bash
# Start trace recording
npx @playwright/cli@latest tracing-start

# Perform actions...
npx @playwright/cli@latest click "button"
npx @playwright/cli@latest type "test data"

# Stop tracing
npx @playwright/cli@latest tracing-stop

# View console messages
npx @playwright/cli@latest console

# Check network requests
npx @playwright/cli@latest network

# Run custom Playwright code
npx @playwright/cli@latest run-code "await page.evaluate(() => window.location.href)"
```

### 7. Advanced Features
```bash
# Mock network requests
npx @playwright/cli@latest route "**/api/products" --status=200 --body='{"products":[]}'

# Handle multiple tabs
npx @playwright/cli@latest tab-new https://example.com
npx @playwright/cli@latest tab-list
npx @playwright/cli@latest tab-select 1
npx @playwright/cli@latest tab-close 0

# Mouse and keyboard interactions
npx @playwright/cli@latest hover "element_ref"
npx @playwright/cli@latest drag "source_ref" "target_ref"
npx @playwright/cli@latest keydown Control
npx @playwright/cli@latest press a
npx @playwright/cli@latest keyup Control
```

## Configuration

Create a `playwright-cli.json` file in your project root:

```json
{
  "browser": "chrome",
  "headless": false,
  "viewport": { "width": 1280, "height": 720 },
  "ignoreHTTPSErrors": true,
  "timeout": 30000
}
```

## Environment Variables

Set session name for consistent testing:
```bash
set PLAYWRIGHT_CLI_SESSION=ecommerce-tests
npx @playwright/cli@latest open https://ecommerce-playground.lambdatest.io
```

## Integration with Test Scripts

Use Playwright CLI commands in batch files or test scripts:

```bash
# Windows batch example
@echo off
echo Starting ecommerce test...
npx @playwright/cli@latest open https://ecommerce-playground.lambdatest.io --headed
npx @playwright/cli@latest snapshot
npx @playwright/cli@latest type "iPhone"
npx @playwright/cli@latest press Enter
npx @playwright/cli@latest screenshot --filename=search-test.png
npx @playwright/cli@latest close
echo Test completed!
```

## Benefits for AI Agents

- **Token Efficient**: No large schemas loaded into context
- **Real-time**: Direct command execution with immediate feedback  
- **Debugging**: Built-in tracing, screenshots, and logging
- **Flexible**: Works with any coding agent or automation tool
- **Persistent**: Browser sessions maintain state between commands