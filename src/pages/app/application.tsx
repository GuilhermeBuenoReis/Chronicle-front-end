import { Dialog } from '../../components/ui/dialog';

import { CreateGoal } from '../../components/create-goal';
import { Summary } from '../../components/summary';
import { useGetWeekSummary } from '../../http/generated/api';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

export function Application() {
  const [searchParams] = useSearchParams();
  const weekStartsAtParam = searchParams.get('week_starts_at');

  const weekStartsAt = weekStartsAtParam
    ? new Date(weekStartsAtParam)
    : new Date();

  const { data } = useGetWeekSummary({
    weekStartsAt: dayjs(weekStartsAt).startOf('week').toISOString(),
  });

  const getWeekSummary = data?.summary;

  return (
    <>
      <Dialog>
        <Summary summary={getWeekSummary!} />

        <CreateGoal />
      </Dialog>
    </>
  );
}
