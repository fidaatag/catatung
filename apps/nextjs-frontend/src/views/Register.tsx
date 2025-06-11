'use client';

// React Imports
import {useState} from 'react';

// Next Imports
import Link from 'next/link';

// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

// Type Imports
import type {Mode} from '@core/types';

// Component Imports
import Illustrations from '@components/Illustrations';
import Logo from '@components/layout/shared/Logo';

// Hook Imports
import {useImageVariant} from '@core/hooks/useImageVariant';
import {z} from 'zod';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthApi} from '@/hooks/use-auth-api/use-auth-api.hook';
import {useToast} from '@/hooks/use-toast/use-toast.hook';
import {type ApiError} from '@/utils/api/api-error.ts';

export const registerSchema = z.object({
  email: z
    .string()
    .transform((val) => val.trim())
    .pipe(z.string().email().max(100, 'Email must be at most 100 characters long')),
  username: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(4, 'Username must be at least 4 characters long')
        .max(20, 'Username must be at most 20 characters long'),
    ),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(128, 'Password must be at most 128 characters long'),
});

export type RegisterFormFields = z.infer<typeof registerSchema>;

function Register({mode}: {readonly mode: Mode}) {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {showToast} = useToast();
  const [didRegisterSuccessfully, setDidRegisterSuccessfully] = useState(false);
  const {register: registerFunction} = useAuthApi();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormFields>({resolver: zodResolver(registerSchema)});

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    await registerFunction({
      params: data,
      onSuccess() {
        reset();
        setDidRegisterSuccessfully(true);
        showToast({
          severity: 'success',
          summary: 'Registration successful',
          detail: 'You have registered. We will send you a confirmation email.',
        });
      },
      async onError(error: ApiError) {
        switch (error.response.status) {
          case 400: {
            const errorResponse = (await error.response.json()) as {message?: string[]};
            const message: string = errorResponse?.message
              ? errorResponse.message.map((message_) => message_.charAt(0).toUpperCase() + message_.slice(1)).join(', ')
              : 'An unexpected error occurred.';
            setError('root', {message});

            break;
          }

          case 409: {
            setError('root', {message: 'Email or username already exists'});

            break;
          }

          case 500: {
            setError('root', {message: 'Something went wrong'});

            break;
          }

          default: {
            setError('root', {message: 'An unknown error occurred'});
          }
        }
      },
    });
  };

  if (didRegisterSuccessfully) {
    return (
      <div className="flex flex-col items-center">
        <h2>Registration successful!</h2>
        <p className="mt-4 md:mt-6 lg:mt-8">We have sent you a confirmation email. Please check your inbox.</p>
        <Link className="underline" href="/login">
          Login here
        </Link>
      </div>
    );
  }

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png';
  const lightImg = '/images/pages/auth-v1-mask-light.png';

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg);

  const handleClickShowPassword = () => {
    setIsPasswordShown((show) => !show);
  };

  return (
    <div className="flex flex-col justify-center items-center min-bs-[100dvh] relative p-6">
      <Card className="flex flex-col sm:is-[450px]">
        <CardContent className="p-6 sm:!p-12">
          <Link href="/" className="flex justify-center items-start mbe-6">
            <Logo />
          </Link>
          <Typography variant="h4">Adventure starts here 🚀</Typography>
          <div className="flex flex-col gap-5">
            <Typography className="mbs-1">Make your app management easy and fun!</Typography>
            <form noValidate autoComplete="off" className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              <TextField autoFocus fullWidth label="Username" {...register('username')} type="text" />
              <TextField autoFocus fullWidth label="Email" {...register('email')} type="text" />
              <TextField
                fullWidth
                label="Password"
                {...register('password')}
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.root ? <p className="text-red-700">{errors.root.message}</p> : null}
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link
                      className="text-primary"
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              <Button fullWidth variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Loading ...' : 'Register'}
              </Button>

              <div className="flex justify-center items-center flex-wrap gap-2">
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href="/login" color="primary">
                  Sign in instead
                </Typography>
              </div>
              <Divider className="gap-3">Or</Divider>
              <div className="flex justify-center items-center gap-2">
                <IconButton size="small" className="text-facebook">
                  <i className="ri-facebook-fill" />
                </IconButton>
                <IconButton size="small" className="text-twitter">
                  <i className="ri-twitter-fill" />
                </IconButton>
                <IconButton size="small" className="text-github">
                  <i className="ri-github-fill" />
                </IconButton>
                <IconButton size="small" className="text-googlePlus">
                  <i className="ri-google-fill" />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{src: authBackground}} />
    </div>
  );
}

export default Register;
