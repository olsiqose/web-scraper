const request = require('request');
const cheerio = require('cheerio');
const Table = require('cli-table');

let articles = [];

const URL = `https://techcrunch.com/startups/`;




var table = new Table({
    head: ['Author', 'Title']
  , colWidths: [30, 90]
});


request(URL, (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        
        $('.post-block').each( (i, elm) => {
            articles.push({
                title: $(elm).find('.post-block__title__link').text(),
                author: $(elm).find('.river-byline__authors').find('a').text()
            });
            
        });

        //Push articles in table
        articles.map(article => table.push([article.author.trim(), article.title.trim()]))
        //Display table in CLI
        console.log(table.toString());
    }
})
