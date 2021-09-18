const express = require('express')
const path = require('path')
const request = require('request');
const PORT = process.env.PORT || 7000
var MobileDetect = require('mobile-detect');
const vliveBrowser = require('./utils/vlive');
const puppeteer = require('puppeteer');
const TikTokScraper = require('tiktok-scraper');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {
  createCipheriv
} = require('crypto');
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    var md = new MobileDetect(req.headers['user-agent'])
    console.log(md.mobile());
    if (md.mobile() != null) { //web browser
      console.log("MOBILE");
      res.render('pages/index_old')
    } else {
      console.log("WEB BROWSER");
      res.render('pages/index_old')
    }

  })
  .get('/jinyoung', (req, res) => {
    var md = new MobileDetect(req.headers['user-agent'])
    console.log(md.mobile());
    if (md.mobile() != null) { //web browser
      console.log("MOBILE");
      res.render('pages/index_jinyoung')
    } else {
      console.log("WEB BROWSER");
      res.render('pages/index_jinyoung')
    }

  })
  .post('/testjson/:param', (req, res) => {
    var param = req.params.param;

    res.send(param);
  })
  .post('/postvlive', async function (req, res) {
    try {

      // const fs = require('fs');
      // const cheerio = require('cheerio');
      // const got = require('got');

      // const vgmUrl = 'https://home.soshistagram.com/naver_v/channel/1844/'; //youngjae channel

      // got(vgmUrl).then(response => {
      //   const $ = cheerio.load(response.body);
      //   $('.video-list').each(function () {

      //     var img_url = $(this).find('.img-responsive').attr('src').split('?type=')[0];
      //     console.log(img_url);
      //   });
      // }).catch(err => {
      //   console.log("------------ERROR----------------")
      //   console.log(err);
      // });


      let url = req.query.url.trim();
      // let tousername = req.query.tousername.trim();
      let data_type = req.query.datatype.trim();
      data_type = data_type.charAt(0).toUpperCase() + data_type.slice(1);
      let data = data_type == "Video" ? await vliveBrowser.getMetaData(url) : await vliveBrowser.getMetaDataArticle(url);

      res.send(data);
    } catch (e) {
      res.send(e);
    }
  })
  .post('/getmedia', async (req, res) => {
    try {

      var shortcode = "CTEvsJ6BgRn";
      var options = {
        'method': 'GET',
        'url': `https://www.instagram.com/p/${shortcode}/?__a=1`,
        'headers': {
          'Cookie': 'csrftoken=JbBXiYmxq1ztjfk6uHtmiBK7iQmpTrVf; ig_did=C6C828BF-977C-4C18-81C5-0C458A2126E5; ig_nrcb=1; mid=XV9e2QAEAAEsX3I6AUTiwHL0h2ff'
        }
      };

      //set request parameter
      request(options, function (error, response) {
        if (error) throw new Error(error);
        else res.json(JSON.parse(response.body));
      });

    } catch (e) {
      res.status(500).json({
        message: e.message
      });
    }
  })
  .get('/tiktok', async (req, res) => {
    try {
      let tiktok_url = "https://www.tiktok.com/@youngjaexars/video/7008845482302704898";
      let options = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
        "referer": "https://www.tiktok.com/",
        "cookie": "sid_tt=fb76831fa608f20894d40de4fe51658a"
      }
      let tiktokMedia = await TikTokScraper.getVideoMeta(tiktok_url, options);
      console.log(tiktokMedia);
      res.json(tiktokMedia);
    } catch (e) {
      res.status(500).json({
        message: e.message
      });
    }

  }).get('/chrome', async (req, res) => {
    try {
      let options = new chrome.Options();
      //Below arguments are critical for Heroku deployment
      options.addArguments("--headless");
      options.addArguments("--disable-gpu");
      options.addArguments("--no-sandbox");

      let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

      driver.get('http://www.google.com');
      driver.quit();
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        message: e.message
      });
    }

  })
  .get('/test', (req, res) => res.sendStatus(200))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))