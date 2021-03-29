const Crawler = require('crawler')
const URL = require('./items')
const {
  getWebsiteFromURL,
  crawlerForFlipkart,
  crawlerForAmazon
} = require('./utils')

URL.forEach(item => {
  const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
      if (error) {
        console.error(error)
      } else {
        var $ = res.$
        let price

        /**
         * Crawling rates from Flipkart and Amazon.
         *
         * ============ Methods Used ===============
         * Here I am catching the rates attribute from HTML by targeting specific class
         * It seems ecom websites use a random string as class name for the rate attribute.
         * But that random string does not change too often. So it can be used to crawl details from the page.
         *
         */
        if (getWebsiteFromURL(item.url, 'flipkart')) {
          price = crawlerForFlipkart($, item.name)
        } else if (getWebsiteFromURL(item.url, 'amazon')) {
          price = crawlerForAmazon($, item.name)
        } else {
          console.log('Invalid URL')
        }

        // Send Alert on Price Drop
        if (price <= item.tragetPrice) {
          console.log('Price Drop for ' + item.name)
        }
      }
      done()
    }
  })

  // Crawl Rates after an interval
  setInterval(() => {
    c.queue(item.url)
  }, 1000 * 60 * 1)
})
