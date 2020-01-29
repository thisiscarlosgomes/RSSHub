const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const link = `https://www.cgtn.com/special/Battling-the-novel-coronavirus-What-we-know-so-far-.html`;

    const res = await got.get(link);
    const $ = cheerio.load(res.body);

    ctx.state.data = {
        title: 'BBC Corona-virus live outbreak',
        link,
        item: $('.share-time-line .timeline-item')
            .get()
            .map((item) => {
                item = $(item);
                return {
                    title: item.find('.news-title').text(),
                    description: item.find('.m-content .text p:nth-of-type(2)').text(),
                };
            }),
    };
};
