const mongoose = require("mongoose")

const meetupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true  
    },
    eventType: {
        type: String,
        enum: ["Online Event", "Offline Event"],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    host: {
        type: String,
    },
    venue: {
        type: String
    },
    address: {
        type: String
    },
    price: {
        type: Number
    },
    details: {
        type: String
    },
    dressCode: {
        type: String
    },
    ageRestrictions: {
        type: String
    },
    eventTags: [{
       type: String
    }],
    speakers: [{
    name: { type: String },
    role: { type: String },
    imageUrl: { type: String }
  }]
})

const Meetup = mongoose.model("Meetup", meetupSchema)

module.exports = Meetup;

