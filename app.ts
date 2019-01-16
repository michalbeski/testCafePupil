// const embeddScreenshotAsBase64 = require('./utils.js');
// const setCurrentEnvironmentData = require('.utils/setEbvData.ts');
const htmlReporterConfig = require('./tcr-html.config.js');
const createTestCafe = require('testcafe');
const fs = require('fs');

const screenshotsDir = "reports/screenshots/";
const screenshotExtension = "png";
const htmlReportFilepath = `${htmlReporterConfig.outputPath}/${htmlReporterConfig.filename}`;

let runner = null;
let testcafe = null;
let browser = 'chrome';
let env = 'local';
let fixtureToRun = null;
let testsToRun = [];
const exitHappy = () => { process.exit() };

for (let i = 2; i < process.argv.length; i++) {
    let argLabel = process.argv[i].split('=')[0];
    let argValue = process.argv[i].split('=')[1];
    if (argLabel === 'browser') {
        browser = argValue;
    } else if (argLabel === 'fixture'){
        fixtureToRun = argValue;
    } else if (argLabel === 'tests') {
        testsToRun = argValue.split(',');
    } else if (argLabel === 'env'){
        env = argValue;
    } else {
        console.log('Invalid argument(s)');
        process.exit();
    }
}

const environmentsData = {
    local: {
        url: ""
    }
}

const settings = {
    browsers: ["chrome"],
    fixtures: {
        "Smoke Test 1": "tests/SmokeTest.ts"

        
    },
    settings: {
        selectorTimeout: 9000,
        assertionTimeout: 5000,
        speed: 0.6
    }
}

const getFixturesToRun = () => (fixtureToRun) ? [settings.fixtures[fixtureToRun]] : Object['values'](settings.fixtures);
const stream = fs.createWriteStream(htmlReportFilepath)
// setCurrentEnvironmentData(environmentsData[env]);

const rejected = er => {
    console.log("************************************************");
    console.log("Error: ", er);
    console.log("************************************************");
    testcafe.close().then(exitHappy);
};

createTestCafe('127.0.0.1')
    .then(tc => {
        testcafe = tc;
        runner = testcafe.createRunner();
        return runner
            .src(getFixturesToRun())
            .filter((testName) =>
                (testsToRun.length === 0) ? true : testsToRun.some((testId) => testName.startsWith(testId + " "))
            )
            .browsers(settings.browsers)
            .screenshots(
                screenshotsDir, true, 
                "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}." + screenshotExtension
            )
            .reporter('spec')
            .reporter('html', stream)
            .run(settings.settings);
    })
    .then(failedCount => {
        console.log("Tests failed: " + failedCount);
        const p = testcafe.close();
        return p;
    })
    .then(exitHappy)
    .catch(rejected);
