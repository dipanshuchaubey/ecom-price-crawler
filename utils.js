/**
 * @description Confirm Website name from the given URL
 * @param {String} url
 * @param {String} websiteName
 * @returns {Boolean}
 */
exports.getWebsiteFromURL = (url, websiteName) => {
  if (url.replace(/(http:\/\/|https:\/\/)(www.)/, '').startsWith(websiteName)) {
    return true
  }

  return false
}

/**
 * @description Cast Rate from String to Number
 * @param {String} string
 * @returns {Number}
 */
exports.stringToNumber = string => {
  return +string.replace('₹', '')
}

/**
 * @description Crawl Rate from Flipkart
 * @param {Object} $
 * @param {String} item
 * @returns {Number}
 */
exports.crawlerForFlipkart = ($, item) => {
  console.log(item + ' [Flipkart]: ' + $('div[class="_30jeq3 _16Jk6d"]').text())
  return exports.stringToNumber($('div[class="_30jeq3 _16Jk6d"]').text())
}

/**
 * @description Crawl Rate from Amazon
 * @param {Object} $
 * @param {String} item
 * @returns {Number}
 */
exports.crawlerForAmazon = ($, item) => {
  let result

  if ((result = $('span[id="priceblock_dealprice"]').text().trim())) {
  } else if ((result = $('span[id="priceblock_ourprice"]').text().trim())) {
  } else if ((result = $('div[id="soldByThirdParty"]').text().trim())) {
  }

  console.log(item + ' [Amazon]: ' + result)
  return exports.stringToNumber(result)
}
