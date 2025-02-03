import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetFolders } from '@/http/generated/api';
import { Search } from 'lucide-react';
import { CreateNoteDialog } from './components/craete-new-folder';
import { NavLink } from '@/components/nav-link';
import dayjs from 'dayjs';

export function Folder() {
  const { data } = useGetFolders();
  console.log(data);
  const folder = data?.result;

  if (!folder) {
    return null;
  }

  const date = folder[0].createdAt;
  const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-center my-4 text-2xl">Suas Pastas!</h1>
      <div className="border rounded-lg p-3 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <form className="flex gap-2 flex-1">
            <Input placeholder="Filtre a nota pela tag" />
            <Button type="submit">
              <Search />
            </Button>
          </form>

          <div className="flex items-center">
            <CreateNoteDialog />
          </div>
        </div>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          {folder.map(folder => {
            return (
              <NavLink
                className=""
                key={folder.id}
                to={`/application/notes/?id=${folder.id}`}
              >
                <div className="w-full flex items-center justify-between border p-3 mb-2 rounded-lg">
                  {folder.name}
                  <p className="text-gray-400">Criado em: {formattedDate}</p>
                </div>
              </NavLink>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}
