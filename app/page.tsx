'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth';
import Link from 'next/link';

export default function Home() {
    const { data: session } = authClient.useSession();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {session ? (
                <>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Welcome back,{' '}
                        {session.user?.name ?? session.user?.email}!
                    </h3>
                    <Button
                        variant="outline"
                        onClick={() => {
                            authClient.signOut();
                        }}
                    >
                        Sign Out
                    </Button>
                </>
            ) : (
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Welcome to Where It Goes! Please{' '}
                    <Link href="/sign-in">sign in</Link> or{' '}
                    <Link href="/sign-up">sign up</Link> to continue.
                </h3>
            )}
        </div>
    );
}
