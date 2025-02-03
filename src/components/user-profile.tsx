import { useGetProfile } from '@/http/generated/api';
import { Avatar, AvatarImage } from './ui/avatar';

export function UserProfile() {
  const { data } = useGetProfile();

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={data?.profile.avatarUrl} />
      </Avatar>

      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold">{data.profile.name}</span>
        <span className="text-xs text-zinc-400 ">
          {data.profile.email ?? 'Sem e-mail do github.'}
        </span>
      </div>
    </div>
  );
}
