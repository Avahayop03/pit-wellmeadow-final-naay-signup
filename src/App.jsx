import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './Routes';
import { Suspense } from 'react';

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
