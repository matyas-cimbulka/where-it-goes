'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '../ui/button';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Card } from '../ui/card';

const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignUpFormData = z.infer<typeof FormSchema>;

export function SignUpForm() {
    const router = useRouter();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(FormSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: SignUpFormData) {
        const response = await authClient.signUp.email({
            ...data,
            callbackURL: '/',
        });

        if (response.error) {
            console.error('Sign up error:', response.error);

            form.setError('root', {
                type: 'server',
                message: response.error.message,
            });
        } else {
            router.replace('/');
        }
    }

    return (
        <Card className="w-full max-w-sm p-6">
            <h1 className="text-xl font-semibold mb-4">Sign Up</h1>
            <form
                id="sign-up-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
            >
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                {...field}
                                id="name"
                                type="text"
                                aria-invalid={fieldState.invalid}
                                required
                                placeholder="Your Name"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="email"
                                aria-invalid={fieldState.invalid}
                                required
                                placeholder="you@example.com"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                {...field}
                                id="password"
                                type="password"
                                aria-invalid={fieldState.invalid}
                                required
                                placeholder="password"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {form.formState.errors.root ? (
                    <FieldError errors={[form.formState.errors.root]} />
                ) : null}

                <Button type="submit" form="sign-up-form">
                    Sign Up
                </Button>
                <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/sign-in" className="underline">
                        Sign in
                    </a>
                </p>
            </form>
        </Card>
    );
}
