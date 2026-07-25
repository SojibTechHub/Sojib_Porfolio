import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { adminLogin } from '../api/adminApi';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { loginSchema, LoginFormData } from '../utils/validators';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await adminLogin(data.email, data.password);
      localStorage.setItem('adminToken', res.data.token);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">Admin Login</h1>
          <p className="text-sm text-[var(--color-muted)]">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8 space-y-5">
          <Input label="Email" type="email" placeholder="admin@portfolio.com" error={errors.email?.message} {...register('email')} />
          <div className="relative">
            <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter password" error={errors.password?.message} {...register('password')} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-[var(--color-muted)] hover:text-[var(--color-text)]">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Button type="submit" loading={loading} icon={<Lock size={16} />} className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};
