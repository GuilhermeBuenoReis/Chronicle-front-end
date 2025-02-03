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
import { useGetNotes } from '@/http/generated/api';
import { Search } from 'lucide-react';

import { NavLink } from '@/components/nav-link';
import dayjs from 'dayjs';

export function Notes() {
  const { data } = useGetNotes();

  const notes = data?.result;

  if (!notes) {
    return null;
  }

  const date = notes[0].createdAt;
  const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');

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
            <NavLink to="/application/notes/create">Nova nota</NavLink>
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
                    <NavLink to="/" asChild>
                      <TableCell>{notes.title}</TableCell>
                      <TableCell>{notes.tags}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                    </NavLink>
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
