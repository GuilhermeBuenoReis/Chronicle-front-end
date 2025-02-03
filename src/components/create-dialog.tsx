import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  useCreateNote,
  useGetFolders,
  useGetProfile,
} from '@/http/generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// export type CreateNoteBody = {
//   content: string;
//   /** @nullable */
//   folder_id: string | null;
//   tags?: string;
//   title: string;
//   userId: string;
// };

export const createNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string(),
});

type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export function CreateNoteDialog() {
  const queryClient = useQueryClient();

  const { register } = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
  });

  // const [searchParams, setSearchParams] = useSearchParams();

  // const { mutateAsync: createNote } = useCreateNote();

  // async function handleCreateNewNote({
  //   title,
  //   content,
  //   tags,
  // }: CreateNoteSchema) {
  //   try {
  //     await createNote({
  //       data: {
  //         title,
  //         content,
  //         tags,
  //         folder_id: ser,
  //       },
  //     });
  //   } catch (error) {}
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar nota</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova nota!</DialogTitle>
        </DialogHeader>

        <form className="flex items-center flex-col gap-4">
          <Input placeholder="Título da nota" {...register('title')} />
          <Textarea placeholder="Conteudo da meta" {...register('content')} />
          <Input placeholder="Tags" {...register('tags')} />

          <Button>Criar nova nota</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
