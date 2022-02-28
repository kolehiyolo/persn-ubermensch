const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// let posts = [];

let posts = [{
    _id: 0,
    title: "Test Blog #1",
    stamp: {
        date: {
            code: "2022-02-22",
            string: "February 2nd, 2022",
            year: 2022,
            month: 3,
            date: 22,
        },
        time: {
            code: "19:54:16 UTC+8",
            string: "07:54:16 PM, UTC+8",
            hour: 19,
            minutes: 54,
            seconds: 16,
            timezone: 8,
        }
    },
    posted: {
        date: {
            // code: "2022-02-22",
            // string: "February 2nd, 2022",
            year: 2022,
            month: 3,
            date: 22,
        },
        time: {
            // code: "19:54:16 UTC+8",
            // string: "07:54:16 PM, UTC+8",
            hour: 19,
            minutes: 54,
            seconds: 16,
            timezone: 8,
        }
    },
    edited: {
        date: {
            code: "2022-02-22",
            string: "February 2nd, 2022",
            year: 2022,
            month: 1,
            date: 22,
        },
        time: {
            code: "19:54:16 UTC+8",
            string: "07:54:16 PM, UTC+8",
            hour: 19,
            minutes: 54,
            seconds: 16,
            timezone: 8,
        }
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus ex similique aut voluptatum praesentium numquam, eligendi provident expedita reiciendis qui et, vitae ut quos, mollitia labore iure delectus est. Voluptas!",
    image: "/images/test.img",
    status: "Done"
}];


// const kolehiyolo = require()
// const kolehiyolo = require(`${__dirname}/public/javascript/functions.js`);

// let posts = kolehiyolo.buildSamples(10);

const global = {
    mongoose: undefined,
    entrySchema: undefined,
    Entry: undefined,
}

function activate() {
    // * Connect to DB with Mongoose
    global.mongoose = require(`mongoose`);
    global.mongoose.connect(`mongodb://localhost:27017/ubermenschDB`);

    // * Build Schema
    global.entrySchema = new global.mongoose.Schema({
        date: {
            type: Date,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    });

    // * Build Mongoose Model
    global.Entry = mongoose.model("entry", global.entrySchema);
}

module.exports = {
    activate: activate,
    homeStartingContent: homeStartingContent,
    aboutContent: aboutContent,
    contactContent: contactContent,
    posts: posts
}