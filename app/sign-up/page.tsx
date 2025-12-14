import { SignUpForm } from '@/components/forms/sign-up-form';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

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
