const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const {CronJob} = require('cron');

// node scraper.js
async function scrapeOnePiece() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://onepiecescan.fr/');

  const content = await page.content();
  const $ = cheerio.load(content);

  const firstLi = $('#ceo_latest_comics_widget-3 ul li').first();

  const latestChapterLink = firstLi.find('a').attr('href');

  await browser.close();

  return latestChapterLink;
}

function saveLatestChapterLink() {
  scrapeOnePiece()
    .then(latestChapterLink => {
      const data = {latestChapterLink};
      fs.writeFileSync('latest_chapter.json', JSON.stringify(data, null, 2));
      console.log('Dernier chapitre de One Piece :', latestChapterLink);
    })
    .catch(error => {
      console.error('Erreur lors du scraping :', error);
    });
}

//CronJob pour planifier le scraping tous les minutes
const job = new CronJob('* * * * *', function () {
  console.log('Exécution du scraping...');
  saveLatestChapterLink();
});

job.start();
