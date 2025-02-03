import { createBrowserRouter } from 'react-router-dom';
import { SingInWithGithub } from './pages/auth/sign-in-with-github';
import { Application } from './pages/app/application';
import { SingInWithGithubCallback } from './pages/auth/sign-in-with-github-callback';
import AppLayout from './pages/app/_layout';
import { Notes } from './pages/app/notes';
import { Folder } from './pages/app/folder';
import { NoteByFolder } from './pages/app/folder/components/notes-by-folder';
import { CreateNote } from './pages/app/notes/components/create-dialog';
import { Tasks } from './pages/app/tasks';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <SingInWithGithub />,
      },
      {
        path: '/auth/github/callback',
        element: <SingInWithGithubCallback />,
      },
    ],
  },
  {
    path: '/application',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Application />,
      },
      {
        path: 'notes',
        element: <Notes />,
      },
      {
        path: 'notes/create',
        element: <CreateNote />,
      },
      {
        path: 'folders',
        element: <Folder />,
      },
      {
        path: 'folders/:id',
        element: <NoteByFolder />,
      },
      {
        path: 'task',
        element: <Tasks />,
      },
    ],
  },
]);
