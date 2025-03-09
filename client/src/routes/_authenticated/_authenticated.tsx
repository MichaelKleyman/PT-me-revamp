import { AuthLogin } from '../../components/auth/AuthLogin'
import { userQueryOptions } from '../../lib/utils/query/query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (error) {
      console.error(error)
      return { user: null }
    }
    // TODO
  },
  component: (user) => {
    if (!user()) {
      return <AuthLogin />
    }

    return <Outlet />
  },
})
