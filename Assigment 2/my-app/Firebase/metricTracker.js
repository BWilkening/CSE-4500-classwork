const { Builder } = require('selenium-webdriver');
const fs = require('fs');

async function writeToCSV(filename, metrics) {
    const header = Object.keys(metrics[0]);
    const rows = metrics.map(metric => Object.values(metric));
    const csv = [header, ...rows].map(row => row.join(',')).join('\n');
    await fs.promises.writeFile(filename, csv);
}

async function main() {
    const driver = await new Builder().forBrowser('chrome').build();

    await driver.get("http://localhost:3000/");
    const metrics = [];
    const SAMPLE_SIZE = 10;
    let count = 0;

    const start_time = Date.now() / 1000;
    while (count < SAMPLE_SIZE) {
        let presence_time = start_time;
        const current_time = Date.now() / 1000;
        presence_time = current_time - start_time;
        console.log(`Presence time: ${presence_time} seconds`);

        const scroll_height = await driver.executeScript("return document.body.scrollHeight");
        const current_scroll = await driver.executeScript("return window.pageYOffset");
        console.log(`Scrolled ${current_scroll}/${scroll_height} pixels`);

        metrics.push({
            "TIMESTAMP (HH:MM:SS)": new Date().toLocaleTimeString(),
            "Precence time (Seconds)": presence_time,
            "Scrolling (Pixels)": current_scroll / scroll_height
        });
        count += 1;
        await driver.sleep(2000);
    }
    await driver.quit();
    console.log(metrics);
    await writeToCSV("metrics.csv", metrics);
}

main();