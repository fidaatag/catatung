'use client';

import {useState} from 'react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

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
import {z} from 'zod';
import Logo from '@components/layout/shared/Logo';
import Illustrations from '@components/Illustrations';
import themeConfig from '@configs/themeConfig';
import {useImageVariant} from '@core/hooks/useImageVariant';
import type {Mode} from '@core/types';
import {useToast} from '@/hooks/use-toast/use-toast.hook';
import {type ApiError} from '@/utils/api/api-error';
import {useAuthApi} from '@/hooks/use-auth-api/use-auth-api.hook';

// ---------- Validation Schemas ----------

const loginCredentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string(),
});

type LoginCredentialsFormFields = z.infer<typeof loginCredentialsSchema>;

const loginTwoFactorSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});

type LoginTwoFactorFormFields = z.infer<typeof loginTwoFactorSchema>;

// ---------- Component ----------

function Login({mode}: {readonly mode: Mode}) {
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {loginCredentials, loginTwoFactor} = useAuthApi();
  const {showToast} = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<LoginCredentialsFormFields>({
    resolver: zodResolver(loginCredentialsSchema),
  });

  const {
    register: register2fa,
    handleSubmit: handleSubmit2fa,
    setError: setError2fa,
    reset: reset2fa,
    formState: {errors: errors2fa, isSubmitting: isSubmitting2fa},
  } = useForm<LoginTwoFactorFormFields>({
    resolver: zodResolver(loginTwoFactorSchema),
  });

  const handleClickShowPassword = () => {
    setIsPasswordShown((show) => !show);
  };

  const onSubmitCredentials: SubmitHandler<LoginCredentialsFormFields> = async (data) => {
    await loginCredentials({
      params: data,
      onSuccess() {
        reset();
        setStep('2fa');
      },
      onError(error: ApiError) {
        if (error.response.status === 401 || error.response.status === 403) {
          setError('root', {message: 'Invalid email or password'});
        } else {
          setError('root', {message: 'Login failed. Try again.'});
        }
      },
    });
  };

  const onSubmit2fa: SubmitHandler<LoginTwoFactorFormFields> = async (data) => {
    await loginTwoFactor({
      params: data,
      onSuccess() {
        reset2fa();
        showToast({severity: 'success', summary: 'Login successful'});
        router.push('/dashboard');
      },
      onError(error: ApiError) {
        if (error.response.status === 401 || error.response.status === 403) {
          setError2fa('root', {message: 'Invalid or expired code'});
        } else {
          setError2fa('root', {message: '2FA failed. Try again.'});
        }
      },
    });
  };

  const darkImg = '/images/pages/auth-v1-mask-dark.png';
  const lightImg = '/images/pages/auth-v1-mask-light.png';
  const authBackground = useImageVariant(mode, lightImg, darkImg);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen relative p-6">
      <Card className="flex flex-col sm:w-[450px]">
        <CardContent className="p-6 sm:!p-12">
          <Link href="/" className="flex justify-center items-center mb-6">
            <Logo />
          </Link>
          {step === 'credentials' ? (
            <>
              <Typography variant="h4">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography className="mb-6">Please sign in to continue</Typography>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmitCredentials)}>
                <TextField
                  fullWidth
                  autoFocus
                  label="Email"
                  {...register('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={isPasswordShown ? 'text' : 'password'}
                  {...register('password')}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
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
                <div className="flex justify-between items-center">
                  <FormControlLabel control={<Checkbox />} label="Remember me" />
                  <Typography component={Link} href="/forgot-password" color="primary">
                    Forgot password?
                  </Typography>
                </div>
                <Button fullWidth type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Loading…' : 'Log In'}
                </Button>
                {errors.root ? (
                  <Typography className="text-red-600 text-center" variant="body2">
                    {errors.root.message}
                  </Typography>
                ) : null}
              </form>
              <Divider className="my-6">or</Divider>
              <div className="flex justify-center gap-2">
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
              <div className="flex justify-center mt-6">
                <Typography>New here?</Typography>
                <Typography component={Link} href="/register" color="primary" className="ml-1">
                  Create an account
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Typography variant="h5">Enter your 2FA Code</Typography>
              <Typography className="mt-2">We have sent a code to your email. Please enter it below.</Typography>
              <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit2fa(onSubmit2fa)}>
                <TextField
                  fullWidth
                  label="Code"
                  inputProps={{maxLength: 6}}
                  {...register2fa('code')}
                  error={Boolean(errors2fa.code)}
                  helperText={errors2fa.code?.message}
                />
                <Button fullWidth type="submit" variant="contained" disabled={isSubmitting2fa}>
                  {isSubmitting2fa ? 'Verifying…' : 'Confirm'}
                </Button>
                {errors2fa.root ? (
                  <Typography className="text-red-600 text-center" variant="body2">
                    {errors2fa.root.message}
                  </Typography>
                ) : null}
              </form>
            </>
          )}
        </CardContent>
      </Card>
      <Illustrations maskImg={{src: authBackground}} />
    </div>
  );
}

export default Login;
