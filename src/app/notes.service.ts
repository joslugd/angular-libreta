import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable()
export class NotesService {
  private notes: Note[];

  getNotes(): Promise<Note[]> {
    if (this.notes) {
      return Promise.resolve(this.notes);
    }

    return new Promise((resolve, reject) => {
      const notes = JSON.parse(localStorage.getItem('notes'));

      this.notes = notes || [];

      // Añade atributo "selected" a false por defecto.
      for (const note of notes) {
        note.selected = false;
      }

      resolve(this.notes);
    });
  }

  /* Obtiene la nota con el índice especificado. */
  getNote(index: number): Promise<Note> {
    return this.getNotes().then(notes => notes[index]);
  }

  /* Actualiza el título y contenido de la nota con el índice especificado. */
  updateNote(index: number, title: string, content: string) {
    return this.getNote(index)
      .then(note => {
        note.title = title;
        note.content = content;
        this.serializeNotes();

        return note;
      });
  }

  /* Crea una nueva nota con un título y un contenido por defecto. */
  createNote(): Promise<Note> {
    return new Promise((resolve, reject) => {
      const note: Note = this.getDefaultNote();
      this.notes.push(note);
      this.serializeNotes();

      resolve(note);
    });
  }

  /* Borra la nota con el índice especificado. */
  deleteNote(index: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notes.splice(index, 1);
      this.serializeNotes();

      resolve(undefined);
    });
  }

  /* Guarda la lista de notas en el almacenamiento local. */
  private serializeNotes() {
    // Omite propiedad "selected" antes de serializar.
    const serialized = [];
    for (const note of this.notes) {
      serialized.push({ title: note.title, content: note.content });
    }

    localStorage.setItem('notes', JSON.stringify(serialized));
  }

  /* Devuelve la nota por defecto creada al añadir una nota a la lista. */
  private getDefaultNote(): Note {
    return {
      title: 'Sin título',
      content: 'Escribe aquí el contenido de la nota',
      selected: false
    };
  }
}
