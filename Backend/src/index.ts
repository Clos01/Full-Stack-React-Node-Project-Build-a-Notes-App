
import 'dotenv/config';
console.log("DATABASE_URL:", process.env.DATABASE_URL);
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";



const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/notes", async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json(notes);
  });

app.listen(5050, () => {
  console.log("server running on localhost:5050");
});



app.post("/api/notes", async (req, res) => {
    const { title, content, smmessage } = req.body; // Correct the typo and use camelCase for smMessage

    if (!title || !content || !smmessage) {
        return res.status(400).send("All fields (title, content, smmessage) are required.");
    }

    try {
        const note = await prisma.note.create({
            data: { title, content, smmessage } // Use camelCase here as defined in your Prisma schema
        });
        res.json(note);
    } catch (error) {
        console.error(error); // Good to log the error for debugging
        res.status(500).send("Oops, something went wrong");
    }
});

app.put("/api/notes/:id", async (req, res) => {
const {title, content, smmessage} = req.body;
const id = parseInt(req.params.id);

if(!id || isNaN(id)) {
    return res 
    .status(400).send("Id Must be a number");
}
try{
    const UpdateNote = await prisma.note.update({
        where: {id},
        data: {title,content, smmessage}
    })
    res.json(UpdateNote);
} catch (error) {
res
.status(500)
.send("oops, Something went wrong")
}

});