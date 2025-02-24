/*
saved object structure
id: string (unique),
title: string,
createdAt: string,
updatedAt: string,
tags: array of string,
body: string,

*/

const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

//push value to array
  const newNote = {
    title, tags, body, id, createdAt, updateAt,
  };

  notes.push(newNote);

//check the inputed value
  const isSuccess = notes.filter( (note) =>  note.id === id ).length > 0;

  if (isSuccess) {
    const res = h.res({
        status: 'Success',
        message: 'Catatan berhasil ditambahkan',
        data: {
            noteId: id,
        },
    });
    res.code(201);
    return res;
  }

  const res = h.res({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  res.code(500);
  return res;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  //getting the notes by id
  const note = note.filter((n) => n.id === id)[0];

  //check the note status 
  if (note !== undefined ) {
    return {
      status: 'Success',
      data: {
        note,
      },
    };
  }

  const res = h.res({
    status: 'fail',
    message: 'Catatan tidak di temukan',
  });
  res.code(404);
  return res;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  //preparing data 
  const { title, tags, body } = req.payload;
  const updateAt = new Date().toISOString();

  //edit notes handling logic
  const index = notes.findIndex((note) > note.id === id);

  if (index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };

    const res = h.res({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    });
    res.code(200);
    return res;
  }

  const res = h.res({
    status: 'fail',
    message: 'Gagal memperbaharui catatan. Id tidak di temukan',
  });
  res.code(404);
  return res;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  //checking data availability
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1){
    notes.splice(index, 1);
    const res = h.res({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    res.code(200);
    return res;
  }
  const res = h.res({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };