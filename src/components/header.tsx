import { ModeToggle } from './mode-toggle';
import logo from '../assets/logo_chronicle.svg';
import { Separator } from './ui/separator';
import { Home, Notebook, Folder, CheckCheck, CheckCircle } from 'lucide-react';
import { NavLink } from './nav-link';
import { AvatarDropdownMenu } from './avatar-dropdown-menu';

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8 border-b">
      <div className="w-full h-16 flex items-center gap-12">
        <div className="h-full flex items-center justify-center flex-rol gap-3">
          <img src={logo} alt="logo chronicle" className="w-12 h-12" />

          <Separator
            orientation="vertical"
            className="dark:text-zinc-50 text-zinc-50 h-12"
          />
        </div>

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink className="flex items-center gap-2" to="/application">
            <Home className="size-5" />
            Deshboard
          </NavLink>
          <NavLink className="flex items-center gap-2" to="/application/notes">
            <Notebook className="size-5" />
            Notes
          </NavLink>

          <NavLink
            className="flex items-center gap-2"
            to="/application/folders"
          >
            <Folder className="size-5" />
            Pastas
          </NavLink>
          <NavLink className="flex items-center gap-2" to="/application/task">
            <CheckCircle className="size-5" />
            Tarefas
          </NavLink>
        </nav>
      </div>

      <div className="flex items-centerg gap-5">
        <ModeToggle className="w-12 h-12 rounded-full" />
        <AvatarDropdownMenu />
      </div>
    </header>
  );
}
