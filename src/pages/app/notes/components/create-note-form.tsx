import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getGetNotesQueryKey, useCreateNote } from '@/http/generated/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const createNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string(),
});

type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export function CreateNoteForm() {
  const { register, handleSubmit } = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
  });

  const { mutateAsync: createNote } = useCreateNote();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleCreateNewNote({
    title,
    content,
    tags,
  }: CreateNoteSchema) {
    try {
      await createNote({
        data: {
          title,
          content,
          tags,
        },
      });
      toast.success('Nota criada com sucesso!');

      queryClient.invalidateQueries({
        queryKey: getGetNotesQueryKey(),
      });

      navigate('/application/notes');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar a nota!');
    }
  }

  return (
    <form
      className="w-1/2 flex items-center flex-col gap-4 border p-8 rounded-lg"
      onSubmit={handleSubmit(handleCreateNewNote)}
    >
      <Input
        placeholder="Título da nota"
        {...register('title')}
        className="p-6"
      />
      <Textarea
        placeholder="Conteudo da meta"
        {...register('content')}
        rows={15}
      />
      <Input placeholder="Tags" {...register('tags')} className="p-6" />

      <Button
        type="submit"
        className="w-full text-white bg-primary hover:bg-primary-dark"
      >
        Criar nova nota
      </Button>
    </form>
  );
}
