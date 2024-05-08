import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
// import { title } from "process";

type Note = {
  id: number;
  title: string;
  content: string;
  smmessage: string;
};

function App() {



  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [smmessage, setMessage] = useState("");

  

  const handleAddNote =  async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5050/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            smmessage
          }),
        }
      );
      const newNote = await response.json();
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setMessage("");
    event.preventDefault();
   } catch(e){

   }


  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/notes"
        );

        const notes: Note[] =
          await response.json();

        setNotes(notes);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);




  const [selectedNote, setSelectedNote] = useState< Note | null> (null);  
const handleNotClick = (note: Note) => {
  setSelectedNote(note);
  setTitle(note.title);
  setContent(note.content);
  setMessage(note.smmessage);

}

const handleUpdateNote =  async (event: React.FormEvent) => {
  event.preventDefault();

  if (!selectedNote) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5050/api/notes/${selectedNote.id}`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          smmessage
        })
      }
    )
    const updatedNote = await response.json();
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
  
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);



  } catch (error) {
   console.log(error) 
  }

  
};

const handleCancel = () => {
  setTitle("");
  setContent("");
  setMessage("");
  setSelectedNote(null);
};
const deleteNote = async (event: React.MouseEvent, noteId: number) => {
  try {
    await fetch(
      `http://localhost:5050/api/notes/${noteId}`,
      {
        method: "DELETE",

      }
    )
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);
  
    setNotes(updatedNotes);
  } catch (error) {
    
  }

};

  return (
    <div className="app-container">
      <form onSubmit= {(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
      
      className="note-form">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        />

        <textarea
          value={smmessage}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={smmessage}
        />
          {selectedNote ? (
    <div className="edit-buttons">
      <button type="submit">Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  ) : (
    <button type="submit">Add Note</button>
  )}

      </form>
      <div className="notes-grid">
        {notes.map((note) => (
       <div key={note.id} className="note-item" onClick={() => handleNotClick(note)}>
  <div className="notes-header">
  <button onClick={(event) => deleteNote(event, note.id)}>x</button>
  </div>
  <h2>{note.title}</h2>
  <p>{note.content}</p>
  <p>{note.smmessage}</p>
</div>
        )
        
        )}
      </div>
    </div>
  );
}

export default App;
