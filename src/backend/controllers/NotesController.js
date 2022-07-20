import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all notes in the db.
 * send GET Request at /api/notes
 * */

export const getAllNotesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { notes: user.notes });
};

/**
 * This handler handles creating a new note
 * send POST Request at /api/notes
 * body contains {note}
 * */

export const createNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    user.notes.push({ ...note, _id: uuid() });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles creating a new note
 * send DELETE Request at /api/notes/:noteId
 * */

export const deleteNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const noteId = request.params.noteId;
    user.notes = user.notes.filter((item) => item._id !== noteId);
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a note
 * send POST Request at /api/notes/:noteId
 * body contains {note}
 * */

export const updateNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);
    const { noteId } = request.params;
    const noteIndex = user.notes.findIndex((note) => note._id === noteId);
    user.notes[noteIndex] = { ...user.notes[noteIndex], ...note };
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles archiving a note
 * send POST Request at /api/notes/archive/:noteId
 * body contains {note}
 * */

export const archiveNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { noteId } = request.params;
    const archivedNote = user.notes.filter((note) => note._id === noteId)[0];
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.archives.push({ ...archivedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, notes: user.notes }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles trashing a note
 * send POST Request at /api/notes/trash/:noteId
 * body contains {note}
 * */

export const trashNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { noteId } = request.params;
    const trashedNote = user.notes.filter((note) => note._id === noteId)[0];
    user.notes = user.notes.filter((note) => note._id !== noteId);
    user.trash.push({ ...trashedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { trash: user.trash, notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const getTagsHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    return new Response(200, {}, { tags: user.tags });
  };
  
  /**
   * This handler handles creating user project tags.
   * send POST Request at /api/tags/:tagName
   * */
  
  export const createTagHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { tag } = JSON.parse(request.requestBody);
    const indexFound = user.tags.findIndex((tagPresent) => tagPresent.tagName === tag.tagName );
    if (indexFound !== -1 ) {
      return new Response(
        409,
        {},
        { errors: ["Duplicate data found. Tag name must be unique."] }
      );
    }
    const createdTag = {
      _id: uuid(),
      ...tag,
    };
    user.tags.push(createdTag);
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { tags: user.tags });
  };
  
  /**
   * This handler handles deleting user project tags.
   * send DELETE Request at /api/tags/:tagName
   * */
  
  export const deleteTagHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const tagId = request.params.tagId;
    user.tags = user.tags.filter((tag) => tag._id !== tagId);
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { tags: user.tags });
  };