'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function NextAuthProvider(
  {children, session}) {
    
  return <SessionProvider session={session}
  basePath='/great/dashboard/api/auth'>{children}</SessionProvider>;
}