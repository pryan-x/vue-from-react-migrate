const igdbApi = require('./config')
const helpers = require('./helpers')

// const year = new Date().getFullYear()

// const endWinter = new Date(Date.UTC(year, 3, 0, 23, 59, 59, 999))
// const endSpring = new Date(Date.UTC(year, 6, 0, 23, 59, 59, 999))
// const endSummer = new Date(Date.UTC(year, 9, 0, 23, 59, 59, 999))
// const endFall = new Date(Date.UTC(year, 0, 0, 23, 59, 59, 999))

const homepage = async (req, res) => {
    const todayUnix = helpers.getTodaysDate()

    // x amt of days before and after today for query filter
    // currently 100 days
    const dateBeforeToday = helpers.getFilterDate().daysBeforeToday
    // currently 150 days
    const dateAfterToday = helpers.getFilterDate().daysAfterToday

    // get object
    const yearDates = helpers.getYearDates()
    const year = yearDates.year
    // const springStartDate = yearDates.springStartDate
    const summerStartDate = yearDates.summerStartDate
    const yearStartDate = yearDates.yearStartDate
    const lastYearStartDate = yearDates.lastYearStartDate
    
    // body of api call, gets sent as data object in request
    // specifies parameters of request
    body = `
        query games "Popular Recent Releases" {
            fields name,rating,rating_count,follows,cover.image_id,genres.*,platforms.name;
            where (first_release_date >= ${dateBeforeToday} & first_release_date <= ${todayUnix}) & hypes > 0 & version_parent = null & rating != null & rating_count > 4;
            sort follows desc;
            limit 16;
        };
        query games "Top Upcoming Games" {
            fields name,rating,rating_count,hypes,follows,cover.image_id,genres.*,platforms.name;
            where (first_release_date >= ${todayUnix}) & cover != null & hypes > 5;
            sort hypes desc;
            limit 24;
        };
        query games "Most Anticipated (Release Date TBA)" {
            fields name,rating,rating_count,hypes,follows,cover.image_id,platforms.name;
            where first_release_date = null & cover != null & hypes > 5;
            sort hypes desc;
            limit 24;
        };
        query games "Popular Game Trailers" {
            fields name,rating,rating_count,hypes,follows,videos.*;
            where first_release_date = null & hypes > 5 & videos != null;
            sort hypes desc;
            limit 24;
        };
        query games "Top Games of ${year-1} Screenshots" {
            fields name,artworks.image_id,screenshots.image_id;
            where (first_release_date >= ${lastYearStartDate} & first_release_date <= ${yearStartDate}) & hypes > 2 & category = 0 & version_parent = null & rating != null & rating_count > 20 & follows > 15 & screenshots != null & artworks != null & rating > 75;
            sort hypes desc;
            limit 40;
        };
        query games "Top Rated Games" {
            fields name,rating,rating_count,follows,cover.image_id,platforms.name;
            where category = 0 & version_parent = null & rating != null & rating_count > 100;
            sort rating desc;
            limit 5;
        };
        query games "Top Games of ${year-1}" {
            fields name,rating,rating_count,follows,cover.image_id,genres.*,platforms.name,screenshots.image_id;
            where (first_release_date >= ${lastYearStartDate} & first_release_date <= ${yearStartDate}) & hypes > 2 & category = 0 & version_parent = null & rating != null & rating_count > 20 & follows > 0;
            sort rating desc;
            limit 5;
        };
        ${todayUnix >= summerStartDate ? `
            query games "Top Games of ${year}" {
                fields name,rating,rating_count,follows,cover.image_id,platforms.name;
                where (first_release_date >= ${yearStartDate} & first_release_date <= ${todayUnix}) & hypes > 2 & version_parent = null & rating != null & rating_count > 20;
                sort rating desc;
                limit 5;
            };
            ` 
        : ''}

        `
        // query games "Most Anticipated" {
        //     fields name,rating,rating_count,follows,cover.image_id,platforms.name;
        //     where first_release_date >= ${todayUnix} & hypes > 50;
        //     sort hypes desc;
        //     limit 16;
        // };
        // query games "Top Upcoming Games" {
        //     fields name,rating,rating_count,follows,cover.image_id,genres.*,platforms.name;
        //     where (first_release_date >= ${todayUnix} & first_release_date <= ${dateAfterToday}) & hypes > 5;
        //     sort hypes desc;
        //     limit 16;
        // };
         

    // limit controls response size
    // offset controls the starting position
    // ex: [limit 30; offset 10;] gives responses of 30 games starting from the 10th position, ignoring the first 10 games that wouldve been given
    try {
        const resp = await igdbApi.post('/multiquery', body)
        console.log(resp)
        res.status(200).json(resp.data)
		// res.json(resp.data);
	} catch (error) {
		console.log(error.request.res);
		res.sendStatus(500);
	}
}

const gamepage = async (req, res) => {
    console.log(req)
    body = `
        fields name,rating,rating_count,follows,cover.image_id,genres.*,platforms.name,artworks.image_id,screenshots.image_id;
        where id = ${req.query.gameid};
        sort follows desc;
        limit 16;
    `
    try {
        const resp = await igdbApi.post('/games', body)
        console.log(resp)
        res.status(200).json(resp.data)
		// res.json(resp.data);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

module.exports = {
    homepage,
    gamepage
}