const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://www.cgtn.com/special/Battling-the-novel-coronavirus-What-we-know-so-far-.html',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.share-time-line .timeline-item');

    ctx.state.data = {
        title: 'China coronavirus outbreak - SCMP',
        link: 'https://www.cgtn.com/special/Battling-the-novel-coronavirus-What-we-know-so-far-.html',
        item: list
            .map((index, item) => {
                item = $(item);
                return {
                    title: item.find('.news-title').text(),
                    description: item.find('.m-content .text p:nth-of-type(2)').text(),
                };
            })
            .get(),
    };
};
