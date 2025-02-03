import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useGetProfile } from '@/http/generated/api';
import { Bolt, LogOut, User } from 'lucide-react';

export function AvatarDropdownMenu() {
  const { data } = useGetProfile();

  if (!data) {
    return null;
  }

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger>
        <Avatar className="w-12 h-12">
          <AvatarImage src={data.profile.avatarUrl} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="px-3 py-2 flex items-center flex-col">
        <DropdownMenuLabel>Painel de controle do usuário</DropdownMenuLabel>
        <DropdownMenuSeparator className="w-full" />
        <DropdownMenuItem
          className="w-full flex items-center justify-start cursor-pointer"
          asChild
        >
          <Link to="profile" className="flex items-center gap-3">
            <User />
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="w-full flex items-center justify-start cursor-pointer"
          asChild
        >
          <Link to="configuration" className="flex items-center gap-3">
            <Bolt />
            Configuraçôes
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="w-full flex items-center justify-start cursor-pointer"
          asChild
        >
          <Link to="exit" className="flex items-center gap-3">
            <LogOut />
            Sair da conta
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
