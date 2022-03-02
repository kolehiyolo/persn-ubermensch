let global = {};

// mongoexport --collection="posts" --db="ubermenschDB" --out="W:\Developer\MongoDB\db\posts.json"

global.activate = () => {
    // * Connect to DB with Mongoose
    global.mongoose = require(`mongoose`);
    // global.mongoose.connect(`mongodb://localhost:27017/ubermenschDB`);
    global.mongoose.connect(`mongodb+srv://admin-kolehiyolo:Test123@cluster0.ys8lv.mongodb.net/ubermenschDB`);

    // * Dates Schema
    global.stampSchema = new global.mongoose.Schema({
        code: {
            type: String,
            required: true
        },
        string: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        date: {
            type: Number,
            required: true
        },
    });

    global.dateSchema = new global.mongoose.Schema({
        code: {
            type: String,
            required: true,
            unique: true,
        },
        string: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        date: {
            type: Number,
            required: true
        },
    });

    // * Time Schema
    global.timeSchema = new global.mongoose.Schema({
        code: {
            type: String,
            required: true
        },
        string: {
            type: String,
            required: true
        },
        hour: {
            type: Number,
            required: true
        },
        minutes: {
            type: Number,
            required: true
        },
        seconds: {
            type: Number,
            required: true
        },
        timezone: {
            type: Number,
            required: true
        }
    });

    // * Combined Dates Schema
    global.stampCombiSchema = new global.mongoose.Schema({
        date: {
            type: global.stampSchema,
            required: true
        },
        time: {
            type: global.timeSchema,
            required: true
        },
    });

    global.dateCombiSchema = new global.mongoose.Schema({
        date: {
            type: global.dateSchema,
            required: true
        },
        time: {
            type: global.timeSchema,
            required: true
        },
    });

    // * Build Schema
    global.postSchema = new global.mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        stamp: {
            type: global.stampCombiSchema,
            required: true
        },
        date: {
            type: global.dateCombiSchema,
            required: true
        },
        edit: {
            type: global.stampCombiSchema,
            required: true
        },
    });

    // * Build Mongoose Model
    global.Post = global.mongoose.model("post", global.postSchema);
    global.Time = global.mongoose.model("time", global.timeSchema);
    global.Stamp = global.mongoose.model("stamp", global.stampSchema);
    global.Date = global.mongoose.model("date", global.dateSchema);
    global.StampCombi = global.mongoose.model("stampCombination", global.stampCombiSchema);
    global.DateCombi = global.mongoose.model("dateCombination", global.dateCombiSchema);

    console.log(`data.activate() SUCCESSFUL`); 
}

global.test = () => {
    const date = new global.Date({
        code: "2022-03-23",
        string: "March 23rd, 2022",
        year: 2022,
        month: 2,
        date: 23,
    });

    const time = new global.Time({
        code: "19:54:16 UTC+8",
        string: "07:54:16 PM, UTC+8",
        hour: 19,
        minutes: 54,
        seconds: 16,
        timezone: 8,
    });

    const stampCombination = new global.Combination({
        date: date,
        time: time
    });

    const post = new global.Post({
        title: "Test post 2",
        body: "Okaaaaay",
        link: "sample link",
        theme: "sample theme",
        status: "Done",
        stamp: stampCombination,
        for: stampCombination,
        edited: stampCombination,
    })

    // post.save();
}

global.activate();

module.exports = {
    activate: global.activate,
    test: global.test,
    mongoose: global.mongoose,
    model: {
        Post: global.Post,
        Time: global.Time,
        Stamp: global.Stamp,
        Date: global.Date,
        StampCombi: global.StampCombi,
        DateCombi: global.DateCombi,
    },
}