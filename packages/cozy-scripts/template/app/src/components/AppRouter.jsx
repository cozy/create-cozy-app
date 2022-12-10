import React from 'react'
import {
  Route,
  Navigate,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements
} from 'react-router-dom'

import TodoWrapper from 'src/components/Todos/TodoWrapper'
import Hello1 from 'src/components/HelloViews/Hello1'
import Hello2 from 'src/components/HelloViews/Hello2'
import AppLayout from 'src/components/AppLayout'

const AppRouter = () => {
  const routes = (
    <Route path="/" element={<AppLayout />}>
      <Route path="todos" element={<TodoWrapper />} />
      <Route path="viewhello1" element={<Hello1 />} />
      <Route path="viewhello2" element={<Hello2 />} />
      <Route path="*" element={<Navigate to="/todos" replace />} />
    </Route>
  )
  const router = createHashRouter(createRoutesFromElements(routes))

  return <RouterProvider router={router} />
}

export default AppRouter
