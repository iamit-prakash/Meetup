const express = require("express")
const app = express()
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const {initializeDatabase} = require("./db/db.connect")
const Meetup = require("./models/meetup.model")

app.use(express.json())

initializeDatabase()

async function createMeetup(newMeetup){
    try {
  const meetup = new Meetup(newMeetup) 
  const saveMeetup = await meetup.save()
  return saveMeetup
    } catch (error){
    throw error
}
}


app.post("/meetups", async (req, res)=> {
    try {
   const savedMeetup = await createMeetup(req.body)
   res.status(201).json({message: "Meetup added successfully.", meetup: savedMeetup})
    } catch (error) {
        res.status(500).json({error: "Failed to add meetup."})
    }
})

async function readByMeetups(){
    try {
  const allMeetups = await Meetup.find()
  return allMeetups
    } catch (error){
        throw error
    }
}

app.get("/meetups", async (req, res)=> {
    try {
   const allMeetups = await readByMeetups()
   if(allMeetups.length != 0){
    res.json(allMeetups)
   } else {
    res.status(404).json({error: "Meetup not found."})
   }
    } catch (error){
        res.status(500).json({error: "Failed to fetch Meetup."})
    }
})

async function readByTitle(meetupTitle){
    try {
   const readByTitle = await Meetup.findOne({title: meetupTitle})     
     return readByTitle;
    } catch (error){
        throw error
    }
}
 

 app.get("/meetups/:meetupTitle", async (req, res)=> {
   try {
   const meetups = await readByTitle(req.params.meetupTitle)
   if(meetups){
    res.json(meetups)
   } else {
    res.status(404).json({error: "meetup not found."})
   }
   }  catch (error){
    res.status(500).json({error: "failed to fetch by title."})
   }
 })

 async function readById(meetupId){
   try {
      const meetup = await Meetup.findById(meetupId)
      return meetup
   } catch(error){
      throw error
   }
}

app.get("/meetups/id/:meetupId", async (req, res) => {
   try {
      const meetup = await readById(req.params.meetupId)

      if(meetup){
         res.json(meetup)
      } else {
         res.status(404).json({ error: "Meetup not found." })
      }

   } catch(error){
      res.status(500).json({ error: "Failed to fetch meetup by id." })
   }
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})