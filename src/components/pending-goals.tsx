import { Plus } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { useQueryClient } from '@tanstack/react-query';
import {
  getGetUserLevelAndExperienceQueryKey,
  getGetWeekPendingGoalsQueryKey,
  getGetWeekSummaryQueryKey,
  useCreateGoalCompletion,
  useGetWeekPendingGoals,
} from '../http/generated/api';

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useGetWeekPendingGoals();
  const { mutateAsync: createGoalCompletion } = useCreateGoalCompletion();

  if (!data) {
    return null;
  }

  const pendingGoals = data.pendingGoals;

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion({ data: { goalId } });

    queryClient.invalidateQueries({ queryKey: getGetWeekSummaryQueryKey() });
    queryClient.invalidateQueries({
      queryKey: getGetWeekPendingGoalsQueryKey(),
    });
    queryClient.invalidateQueries({
      queryKey: getGetUserLevelAndExperienceQueryKey(),
    });
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {pendingGoals.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
