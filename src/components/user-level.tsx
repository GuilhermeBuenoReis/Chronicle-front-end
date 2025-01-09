import { useGetUserLevelAndExperience } from '@/http/generated/api';
import { Progress, ProgressIndicator } from './ui/progress-bar';

export function UserLevel() {
  const { data } = useGetUserLevelAndExperience();

  if (!data) {
    return null;
  }
  const porcentage = Math.round(
    (data.experience * 100) / data.experienceToNextLevel
  );
  return (
    <div className="max-w-[220px] w-full flex flex-col gap-1">
      <div className="flex w-full items-center justify-between text-xxs text-zinc-200">
        <span>Lvl {data.level}</span>
        <span className="text-zinc-400">
          {data.experience}xp de {data.experienceToNextLevel}xp
        </span>
        <span>{porcentage}%</span>
      </div>
      <Progress value={data.experience} max={data.experienceToNextLevel}>
        <ProgressIndicator style={{ width: `${porcentage}%` }} />
      </Progress>
    </div>
  );
}
