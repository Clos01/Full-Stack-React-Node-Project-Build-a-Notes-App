import React from "react";
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



  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Monday",
      content: "11-8pm  ",
      smmessage: "Ex: Good Job Today!",
    },
    {
      id: 2,
      title: "Tuesday",
      content: "9-6om",
      smmessage: "Ex: Tomorrow you will do great!",
    },
    {
      id: 3,
      title: "Wednesday",
      content: "off lets goooo",
      smmessage:
        "Ex: Ayyye lets go study enjoy the day and have an amazing day!",
    },
    {
      id: 4,
      title: "Thursday",
      content: "11-8pm",
      smmessage: "Ex: 3 more days!",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [smmessage, setMessage] = useState("");

  

  const handleAddNote = (event: React.FormEvent) => {
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
      smmessage: smmessage,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setMessage("");
    event.preventDefault();

  };


  const [selectedNote, setSelectedNote] = useState< Note | null> (null);  
const handleNotClick = (note: Note) => {
  setSelectedNote(note);
  setTitle(note.title);
  setContent(note.content);
  setMessage(note.smmessage);

}

const handleUpdateNote = (event: React.FormEvent) => {
  event.preventDefault();

  if (!selectedNote) {
    return;
  }

  const updatedNote: Note = {
    id: selectedNote.id,
    title: title,
    content: content,
    smmessage: smmessage
  };

  const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

  setNotes(updatedNotesList);
  setTitle("");
  setContent("");
  setSelectedNote(null);
};

const handleCancel = () => {
  setTitle("");
  setContent("");
  setMessage("");
  setSelectedNote(null);
};
const deleteNote = (event: React.MouseEvent, noteId: number) => {
  event.stopPropagation();

  const updatedNotes = notes.filter((note) => note.id !== noteId);

  setNotes(updatedNotes);
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
