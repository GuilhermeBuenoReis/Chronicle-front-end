import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetNotesWithFolder } from '@/http/generated/api';
import { Search } from 'lucide-react';

import { useSearchParams } from 'react-router-dom';
import { CreateNoteByFolderDialog } from './create-new-note';

export function NoteByFolder() {
  const [searchParams] = useSearchParams();
  const folder_id = searchParams.get('id');

  if (!folder_id) {
    return <p>Por favor, selecione uma pasta válida.</p>;
  }

  const { data } = useGetNotesWithFolder({ folder_id });
  const notes = data?.result;

  if (!data) {
    return null;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-center my-4 text-2xl">Suas notas!</h1>
      <div className="border rounded-lg p-3 ">
        <div className="flex items-center gap-6">
          <form className="flex gap-2 flex-1">
            <Input placeholder="Filtre a nota pela tag" />
            <Button type="submit">
              <Search />
            </Button>
          </form>

          <div className="flex items-center">
            <CreateNoteByFolderDialog />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Criado em</TableHead>
          </TableHeader>

          <TableBody>
            {notes ? (
              notes.map(notes => {
                return (
                  <TableRow key={notes.id}>
                    <TableCell>{notes.title}</TableCell>
                    <TableCell>{notes.tags}</TableCell>
                    <TableCell>{notes.createdAt}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <span>hello word</span>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
