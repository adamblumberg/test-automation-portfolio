// Mocha configuration file
module.exports = {
    // Test files pattern
    spec: 'tests/**/*.test.js',
    
    // Timeout for tests (30 seconds)
    timeout: 30000,
    
    // Reporter
    reporter: 'spec',
    
    // Recursive directory search
    recursive: true,
    
    // Exit after tests complete
    exit: true,
    
    // Colors in output
    color: true,
    
    // Slow test threshold (in ms)
    slow: 5000,
    
    // Global setup/teardown
    require: []
};
