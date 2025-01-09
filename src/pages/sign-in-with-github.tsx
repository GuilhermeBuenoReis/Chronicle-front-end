import logo from '../assets/logo_chronicle.svg';
import { Button } from '../components/ui/button';
import github from '../assets/github-logo.svg';

export function SingInWithGithub() {
  const githubUrl = new URL('https://github.com/login/oauth/authorize');

  githubUrl.searchParams.set('client_id', 'Ov23limeyQYLf9rDqhMu');

  return (
    <main className=" h-screen flex items-center justify-center gap-8 flex-col">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Chronicle" className="w-10 h-10" />
        <span className="text-2xl font-semibold text-zinc-300">Chronicle</span>
      </div>

      <p className="text-center max-w-80 text-zinc-300 leading-relaxed ">
        Conclua suas metas semanais, ganhe experiência e suba de nível
      </p>

      <Button
        className="bg-white text-black hover:bg-white hover:opacity-60"
        asChild
      >
        <a href={githubUrl.toString()}>
          <img src={github} alt="Github" />
          Entrar com github
        </a>
      </Button>
    </main>
  );
}
