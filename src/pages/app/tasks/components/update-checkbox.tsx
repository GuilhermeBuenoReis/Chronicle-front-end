import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import {
  getGetTasksQueryKey,
  useUpdatedCheckboxFromTask,
} from '@/http/generated/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTaskStore } from '@/global-state/task-global-state';

const updateCheckBoxTaskSchema = z.object({
  is_completed: z.boolean(),
});

type UpdateCheckBoxTaskSchema = z.infer<typeof updateCheckBoxTaskSchema>;

export function UpdateCheckbox() {
  const queryClient = useQueryClient();
  const { taskId } = useTaskStore();

  const { mutateAsync: updateTask } = useUpdatedCheckboxFromTask();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateCheckBoxTaskSchema>({
    resolver: zodResolver(updateCheckBoxTaskSchema),
    defaultValues: { is_completed: false },
  });

  async function handleUpdateCheckBoxTask({
    is_completed,
  }: UpdateCheckBoxTaskSchema) {
    try {
      await updateTask({
        data: {
          is_completed,
        },
        params: {
          id: taskId,
        },
      });
      queryClient.invalidateQueries({ queryKey: getGetTasksQueryKey() });
      toast.success('Status da tarefa atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao autorizar a tarefa!');
      console.log(errors.is_completed?.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateCheckBoxTask)}>
      <Controller
        name="is_completed"
        control={control}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onCheckedChange={checked => {
              field.onChange(checked);
              handleSubmit(handleUpdateCheckBoxTask)();
            }}
            ref={field.ref}
          />
        )}
      />
    </form>
  );
}
