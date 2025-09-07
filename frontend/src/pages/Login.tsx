import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input';
import { Particles } from '@/components/ui/particles';
import { loginUrl } from '@/lib/urls';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function Login() {
  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!data.username) {
      toast.error('Please enter a username');
      return;
    } else if (!data.password) {
      toast.error('Please enter a password');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', loginUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(
      JSON.stringify({
        username: data.username,
        password: data.password,
      })
    );
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status < 300) {
        toast.success('Login successful.');

        const token = JSON.parse(xhr.response).token;

        localStorage.setItem('token', token);

        navigate('/home');
      } else {
        toast.error('Login unsuccessful');
      }
    };
  };

  const form = useForm<z.infer<typeof FormSchema>>();

  return (
    <div className="w-vw h-screen flex items-center justify-center">
      <div className="w-md flex flex-col gap-5">
        <div className="bg-white/1 backdrop-blur-sm p-5 rounded-xl border">
          <h1 className="text-4xl text-center mb-5">
            <b>Login</b>
          </h1>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </div>
      </div>
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        size={2}
        refresh
      />
    </div>
  );
}

export default Login;
