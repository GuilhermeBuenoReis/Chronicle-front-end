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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  getGetNotesWithFolderQueryKey,
  useCreateNoteByFolder,
} from '@/http/generated/api';

export const createNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string(),
});

type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export function CreateNoteByFolderDialog() {
  const { register, handleSubmit } = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
  });

  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const { mutateAsync: createNote } = useCreateNoteByFolder();

  async function handleCreateNoteByFolder({
    content,
    tags,
    title,
  }: CreateNoteSchema) {
    try {
      const folder_id = searchParams.get('id');
      if (!folder_id) {
        toast.error('Você precisa escolher uma pasta.');
        return;
      }

      await createNote({
        data: {
          title,
          content,
          tags,
        },
        params: {
          folderId: folder_id,
        },
      });

      queryClient.invalidateQueries({
        queryKey: getGetNotesWithFolderQueryKey({ folder_id }),
      });

      toast.success('Nota criada com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao tentar criar a nota');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar nota</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova nota!</DialogTitle>
        </DialogHeader>

        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmit(handleCreateNoteByFolder)}
        >
          <Input placeholder="Título da nota" {...register('title')} />
          <Textarea placeholder="Conteudo da meta" {...register('content')} />
          <Input placeholder="Tags" {...register('tags')} />

          <Button>Criar nova nota</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
