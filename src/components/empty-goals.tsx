import logo from '../assets/logo-in-orbit.svg';
import letsStarted from '../assets/lets-start-ilustration.svg';
import { DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export function EmptyGoals() {
  return (
    <div className=" h-screen flex items-center justify-center gap-8 flex-col">
      <img src={logo} alt="In.orbit" />

      <img src={letsStarted} alt="Lets Started ilustration" />

      <p className="text-center max-w-80 text-zinc-300 leading-relaxed">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
