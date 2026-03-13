// import fs from 'fs';
// const f = await fetch('https://api.cloudflare.com/client/v4/accounts//browser-rendering/crawl/', {
//     headers: {
//         authorization: 'Bearer inJQjPI5kcXSrF-fiaGGpxs_aQtAfqjttFTnRDx5',
//         'content-type': 'application/json'
//     }
// })

// const b = await f.json();
// const markdowns = b.result.records.filter((r) => 'markdown' in r)
// function parseName(name) {
//     return name.replace(/\s/gi, '_');
// }

// async function* writeFiles(markdowns) {
//     for (const markdown of markdowns) {
//         const filename = parseName(markdown.metadata.title);
//         await fs.promises.writeFile(`./${filename}.md`, markdown.markdown, 'utf8');
//         yield filename;
//     }
// }
// for await (const filename of writeFiles(markdowns)) {
//     console.log(`File written successfully! ${filename}`);
// }

async function delay(fn, delay = 200, ...args) {
    return new Promise(resolve => setTimeout(() => {
        if (typeof fn === 'function') {
            resolve(fn(...args));
        }
    }, delay));
}
function log(log) {
    return log
}

function generateSomePromises() {
    return [
        delay(log, 200, 'one'),
        delay(log, 500, 'two'),
        delay(log, 700, 'three'),
        delay(log, 2000, 'four'),
    ]
}
async function getUniversities(countryName) {
    const get = await fetch(`http://universities.hipolabs.com/search?country=${countryName}`, {
        headers: {
            'content-type': 'application/json'
        }
    });
    const blob = await get.json();
    return blob.slice(0, 5);
}

const countries = [
    getUniversities('iran'),
    getUniversities('turkiye'),
    getUniversities('germany'),
]
async function main() {
    for await (const val of generateSomePromises()) {
        console.log('val >>', val);
    }
    for await (const val of countries) {
        console.log('val >>', val);
    }
}
main();