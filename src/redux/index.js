import { signupUser, loginUser, logOut, userSelector, userSlice } from "./auth";

import { getAllNotes, createaNote, editaNote, getArchive, addToArchive, restoreArchive, deleteArchive, getTrash, addtoTrash, restorefromTrash, deleteNoteFromTrash, noteSelector, NoteSlice } from "./notes";

import { getTags, createaTag, deleteaTag, tagSelector, TagSlice } from "./tag";

export {
    signupUser,
    loginUser,
    logOut,
    userSelector,
    userSlice,

    getAllNotes,
    createaNote,
    editaNote,

    getArchive,
    addToArchive,
    restoreArchive,
    deleteArchive,

    getTrash,
    addtoTrash,
    restorefromTrash,
    deleteNoteFromTrash,

    noteSelector,
    NoteSlice,

    getTags, 
    createaTag, 
    deleteaTag, 
    tagSelector, 
    TagSlice
}