import { createBrowserRouter } from 'react-router-dom';
import { SingInWithGithub } from './pages/sign-in-with-github';
import { Application } from './pages/application';
import { SingInWithGithubCallback } from './pages/sign-in-with-github-callback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SingInWithGithub />,
  },

  {
    path: '/application',
    element: <Application />,
  },
  {
    path: '/auth/github/callback',
    element: <SingInWithGithubCallback />,
  },
]);
