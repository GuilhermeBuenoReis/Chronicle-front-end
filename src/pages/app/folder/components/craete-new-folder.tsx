import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getGetFoldersQueryKey, useCreateFolders } from '@/http/generated/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const createNoteSchema = z.object({
  name: z.string(),
});

type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export function CreateNoteDialog() {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
  });

  const { mutateAsync: createFolder } = useCreateFolders();

  async function handleCreateNewFolder({ name }: CreateNoteSchema) {
    try {
      await createFolder({
        data: {
          name,
        },
      });

      queryClient.invalidateQueries({
        queryKey: getGetFoldersQueryKey(),
      });

      toast.success('Pasta criada com sucesso');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao tentar criar a pasta');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar pasta</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova nota!</DialogTitle>
        </DialogHeader>

        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmit(handleCreateNewFolder)}
        >
          <Input
            placeholder="Qual será o nome da pasta"
            {...register('name')}
          />

          <Button>Criar nova nota</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
