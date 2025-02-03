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
import {
  getGetTasksQueryKey,
  useCreateTask,
  useGetTasks,
} from '@/http/generated/api';
import dayjs from 'dayjs';
import { CircleCheck, CircleX, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { UpdateCheckbox } from './components/update-checkbox';
import { useTaskStore } from '@/global-state/task-global-state';

export const createTaskSchema = z.object({
  title: z.string(),
  content: z.string(),
  is_completed: z.boolean().default(false),
});

type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export function Tasks() {
  const queryClient = useQueryClient();
  const { setTaskId } = useTaskStore();

  const { register, handleSubmit } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { is_completed: false },
  });

  const { data } = useGetTasks();
  const { mutateAsync: createTask } = useCreateTask();

  const task = data;

  if (!task) {
    return null;
  }

  async function handleCreateNewTask({
    title,
    content,
    is_completed,
  }: CreateTaskSchema) {
    try {
      const newTask = await createTask({
        data: {
          title,
          content,
          is_completed,
        },
      });

      setTaskId(newTask.task.id);

      queryClient.invalidateQueries({ queryKey: getGetTasksQueryKey() });
    } catch (error) {
      console.log(error);
    }
  }

  const date = task[0].createAt;
  const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-center my-4 text-2xl">Suas notas!</h1>
      <div className="border rounded-lg p-3 ">
        <div className="flex items-center gap-6">
          <form className="flex gap-2 flex-1">
            <Input placeholder="Filtre a tarefa pelo título" />
            <Button type="submit">
              <Search />
            </Button>
          </form>

          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Criar Tarefa</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar nova Tarefa</DialogTitle>
                </DialogHeader>

                <form
                  className="flex items-center flex-col gap-4"
                  onSubmit={handleSubmit(handleCreateNewTask)}
                >
                  <Input
                    placeholder="Título da tarefa"
                    {...register('title')}
                  />
                  <Input placeholder="Conteúdo" {...register('content')} />

                  <Button type="submit">Criar nova nota</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableHead>Checkbox</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Conteúdo</TableHead>
            <TableHead>Completado</TableHead>
            <TableHead>Criado em</TableHead>
          </TableHeader>

          <TableBody>
            {task ? (
              task.map(task => {
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <UpdateCheckbox />
                    </TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.content}</TableCell>
                    <TableCell>
                      {task.is_completed === true ? (
                        <div className="flex items-center gap-4">
                          <CircleCheck className="text-green-700" />
                          <span>Completado</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <CircleX className="text-red-700" />
                          <span>Completado</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{formattedDate}</TableCell>
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
