import { Note } from './note';

// Representa un evento de edición de una nota.
export class EditEvent {
  originalNote: Note;
  newTitle: string;
  newContent: string;
}
