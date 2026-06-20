const https = require('https');
const fs = require('fs');
const path = require('path');

const signs = {
  stop: "MUTCD R1-1",
  yield: "MUTCD R1-2",
  doNotEnter: "MUTCD R5-1",
  wrongWay: "MUTCD R5-1a",
  speedLimit: "MUTCD R2-1",
  schoolZone: "MUTCD S1-1",
  noUTurn: "MUTCD R3-4",
  noLeftTurn: "MUTCD R3-2",
  railroad: "MUTCD W10-1",
  pedestrian: "MUTCD W11-2",
  merge: "MUTCD W4-1",
  laneEnds: "MUTCD W4-2",
  curve: "MUTCD W1-2",
  construction: "MUTCD W20-1",
  stopAhead: "MUTCD W3-1",
  handicapped: "MUTCD D9-6",
  carpool: "MUTCD R3-14",
  schoolBus: "School bus yellow",
  flashingRed: "Traffic light red",
  flashingYellow: "Traffic light yellow",
  greenArrow: "Traffic light green arrow"
};

const outputDir = path.join(__dirname, 'images', 'signs');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchWikimedia(query) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=File:${encodeURIComponent(query)}&utf8=&format=json&srlimit=1`;
    https.get(url, { headers: { 'User-Agent': 'DadLicenseApp/1.0 (mohamed.elnaggar@ucalgary.ca)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.search && json.query.search.length > 0) {
            resolve(json.query.search[0].title);
          } else {
            resolve(null);
          }
        } catch(e) { reject(new Error(data)); }
      });
    }).on('error', reject);
  });
}

const { exec } = require('child_process');

async function downloadFile(title, outName) {
  const filename = title.replace('File:', '').replace(/ /g, '_');
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=400`;
  const destPath = path.join(outputDir, `${outName}.png`);
  
  return new Promise((resolve, reject) => {
    exec(`curl -sL -A "DadLicenseApp/1.0" "${url}" -o "${destPath}"`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function run() {
  for (const [key, query] of Object.entries(signs)) {
    console.log(`Searching for ${key} (${query})...`);
    try {
      const title = await searchWikimedia(query);
      if (title) {
        console.log(`Found: ${title}, downloading...`);
        await downloadFile(title, key);
        console.log(`Downloaded ${key}.png`);
      } else {
        console.log(`Not found: ${query}`);
      }
    } catch(e) {
      console.error(`Error with ${key}:`, e.message.slice(0, 100));
    }
    await wait(2000); // 2 second delay to avoid rate limits
  }
}

run();
