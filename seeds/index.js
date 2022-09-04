const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
}) 

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //MY USER ID
            author: '6307c1b302add84605301d88',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptatum tempore earum tenetur iure dolore fugit dolores nulla possimus id non temporibus quisquam odit, eveniet obcaecati rerum delectus laudantium dicta.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhwhaugrh/image/upload/v1661755611/YelpCamp/r9k3fgikmmrfsuu6rnu2.jpg',
                    filename: 'YelpCamp/r9k3fgikmmrfsuu6rnu2',
                },
                {
                    url: 'https://res.cloudinary.com/dhwhaugrh/image/upload/v1661755614/YelpCamp/stmwwwmnqtgdz52cknb6.jpg',
                    filename: 'YelpCamp/stmwwwmnqtgdz52cknb6',
                }
              
            ]
        })
        await camp.save();  
    }
}

seedDB().then(() => {
    db.close();
});