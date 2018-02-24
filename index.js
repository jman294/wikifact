#! /usr/bin/env node

const http = require('follow-redirects').http
const cheerio = require('cheerio')

http.get('http://en.wikipedia.org/wiki/Special:Random', (res) => {
  const loc = res.headers['location']
  let string
  res.on('data', (chunk) => {
    string += chunk.toString()
  })
  res.on('end', () => {
    let $ = cheerio.load(string)
    let introText = $('#bodyContent p').text()
    let introSentence = introText.substr(0, introText.indexOf('.')+1)
    console.log(introSentence)
  })
})
