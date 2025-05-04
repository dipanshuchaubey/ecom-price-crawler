import Crawler from 'crawler'
import URL from './items.js'
import {
  getWebsiteFromURL,
  crawlerForFlipkart,
  crawlerForAmazon
} from './utils.js'

URL.forEach(item => {
  const c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
      if (error) {
        console.error(error)
      } else {
        const cr_func = res.$
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
          price = crawlerForFlipkart(cr_func, item.name)
        } else if (getWebsiteFromURL(item.url, 'amazon')) {
          price = crawlerForAmazon(cr_func, item.name)
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
    c.add(item.url)
  }, 1000 * 60 * 1)
})
