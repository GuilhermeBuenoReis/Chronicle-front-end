import { ArrowLeft, ArrowRight, CheckCircle2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { DialogTrigger } from './ui/dialog';
import logoChronicle from '../assets/logo_chronicle.svg';
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from './ui/separator';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { PendingGoals } from './pending-goals';
import {
  getGetWeekPendingGoalsQueryKey,
  getGetWeekSummaryQueryKey,
  type GetWeekSummary200Summary,
} from '../http/generated/api';
import { QueryClient } from '@tanstack/react-query';
import { UserProfile } from './user-profile';
import { UserLevel } from './user-level';
import { useSearchParams } from 'react-router-dom';

dayjs.locale(ptBR);

interface SummaryProps {
  summary: GetWeekSummary200Summary;
}

export function Summary({ summary }: SummaryProps) {
  const queryClient = new QueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const weekStartsAtParam = searchParams.get('week_starts_at');

  const weekStartsAt = weekStartsAtParam
    ? new Date(weekStartsAtParam)
    : new Date();

  const firstDayOfWeek = dayjs(weekStartsAt).startOf('week').format('D MMM');
  const lastDayOfWeek = dayjs(weekStartsAt).endOf('week').format('D MMM');

  if (!summary) {
    return null;
  }

  const completedPercentage = summary.total
    ? Math.round((summary?.completed * 100) / summary?.total)
    : 0;

  queryClient.invalidateQueries({ queryKey: getGetWeekSummaryQueryKey() });
  queryClient.invalidateQueries({
    queryKey: getGetWeekPendingGoalsQueryKey(),
  });

  function handlePreviousWeek() {
    const params = new URLSearchParams(searchParams);

    params.set(
      'week_starts_at',
      dayjs(weekStartsAt).subtract(7, 'days').toISOString()
    );

    setSearchParams(params);
  }

  function handleNextWeek() {
    const params = new URLSearchParams(searchParams);

    params.set(
      'week_starts_at',
      dayjs(weekStartsAt).add(7, 'days').toISOString()
    );

    setSearchParams(params);
  }

  const isCurrentWeek = dayjs(weekStartsAt).endOf('week').isAfter(new Date());

  return (
    <main className="max-w-[600px] mx-auto flex flex-col px-5 gap-6 py-10">
      <div className="dark:bg-zinc-950 bg-zinc-50 rounded-xl px-4 py-3 flex items-center justify-between">
        <UserProfile />
        <UserLevel />
      </div>

      <div className="px-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoChronicle} alt="Logo chronicle" className="h-9 w-9" />
            <span className="text-lg font-semibold capitalize">
              {firstDayOfWeek} - {lastDayOfWeek}
            </span>
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePreviousWeek}
                variant="secondary"
                size="icon"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                disabled={isCurrentWeek}
                onClick={handleNextWeek}
                variant="secondary"
                size="icon"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Cadastrar meta
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-3">
          <Progress value={summary.completed} max={summary.total ?? 1}>
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-xs darkdark:text-zinc400 text-zinc-950">
            <span>
              Você completou{' '}
              <span className="dark:text-zinc-100 text-zinc-950">
                {summary?.completed}
              </span>{' '}
              de{' '}
              <span className="dark:text-zinc-100 text-zinc-950">
                {summary?.total}
              </span>{' '}
              metas nessa semana.
            </span>
            <span>{completedPercentage}%</span>
          </div>
        </div>

        <Separator />

        {isCurrentWeek && <PendingGoals />}

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {summary.goalsPerDay &&
            Object.entries(summary.goalsPerDay).map(([date, goals]) => {
              const weekDay = dayjs(date).format('dddd');
              const formattedDate = dayjs(date).format('D[ de ]MMMM');

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    <span className="capitalize">{weekDay}</span>{' '}
                    <span className="dark:text-zinc400 text-zinc-950 text-xs">
                      ({formattedDate})
                    </span>
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {goals.map(goal => {
                      const time = dayjs(goal.completedAt).format('HH:mm');

                      return (
                        <li key={goal.id} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm dark:text-zinc-400 text-zinc-950">
                            Você completou
                            <span className="dark:text-zinc-100 text-zinc-950">
                              {goal.title}
                            </span>
                            " as{' '}
                            <span className="dark:text-zinc-100 text-zinc-950">
                              {time}h
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
