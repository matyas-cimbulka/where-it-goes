'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { authClient } from '@/lib/auth';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

const FormSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof FormSchema>;

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: SignInFormData) {
    const response = await authClient.signIn.email(data);

    if (response.error) {
      console.error('Sign in error:', response.error);

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
      <h1 className="text-xl font-semibold mb-4">Sign In</h1>
      <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors.root ? <FieldError errors={[form.formState.errors.root]} /> : null}

        <Button type="submit" disabled={form.formState.isSubmitting} form="sign-in-form">
          Sign In
        </Button>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <a href="/sign-up" className="underline">
            Sign up
          </a>
        </p>
      </form>
    </Card>
  );
}
