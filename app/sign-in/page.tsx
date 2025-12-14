import { SignInForm } from '@/components/forms/sign-in-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session ? (
        redirect('/')
    ) : (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <SignInForm />
        </div>
    );
}
