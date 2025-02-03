import { CreateNoteForm } from './create-note-form';

export function CreateNote() {
  return (
    <div className="w-screen p-6 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold text-foreground">Criar anotação</h1>

      <CreateNoteForm />
    </div>
  );
}
