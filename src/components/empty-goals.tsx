import logo from '../assets/logo_chronicle.svg';
import letsStarted from '../assets/lets-start-ilustration.svg';
import { DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export function EmptyGoals() {
  return (
    <main className=" h-screen flex items-center justify-center gap-8 flex-col">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Chronicle" className="w-10 h-10" />
        <span className="text-2xl font-semibold text-zinc-300">Chronicle</span>
      </div>

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
    </main>
  );
}
