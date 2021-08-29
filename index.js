const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 7000
var MobileDetect = require('mobile-detect');
const vliveBrowser = require('./utils/vlive');
const puppeteer = require('puppeteer');
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

      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();
      // await page.goto('https://example.com', {
      //   waitUntil: 'networkidle2',
      // });
      // await browser.close();
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('https://www.instagram.com/333cyj333/?__a=1', {
        waitUntil: 'networkidle2',
      });

      let result = await page.on('response', async response => {
        console.log('got response', response._url)
        const data = await response.json();
        return data;
      })

      console.log(result);
      await browser.close()
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  })
  .get('/test', (req, res) => res.sendStatus(200))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))