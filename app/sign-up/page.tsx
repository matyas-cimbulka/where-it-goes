import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SignUpForm } from '@/components/forms/sign-up-form';
import { auth } from '@/lib/auth';

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ? (
    redirect('/')
  ) : (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <SignUpForm />
    </div>
  );
}
