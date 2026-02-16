const newman = require('newman');
const path = require('path');

// Newman configuration for running Trello API tests
const runTrelloTests = () => {
    newman.run({
        collection: path.join(__dirname, '../collections/Trello API.postman_collection.json'),
        environment: path.join(__dirname, '../environments/trello-testing.json'),
        reporters: ['cli', 'html', 'json'],
        reporter: {
            html: {
                export: path.join(__dirname, '../reports/trello-api-report.html')
            },
            json: {
                export: path.join(__dirname, '../reports/trello-api-results.json')
            }
        },
        iterationCount: 1,
        bail: false,
        color: 'on',
        delay: {
            item: 500 // 500ms delay between requests
        }
    }, function (err) {
        if (err) {
            console.error('❌ Collection run failed:', err);
            process.exit(1);
        }
        
        console.log('✅ Trello API tests completed successfully!');
        console.log('📊 Check the reports folder for detailed results');
    });
};

// Run the tests
console.log('🚀 Starting Trello API Test Suite...');
runTrelloTests();