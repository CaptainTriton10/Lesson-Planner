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
import { PasswordInput } from '@/components/ui/password-input';
import { registerUrl } from '@/lib/urls';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string(),
  name: z.string(),
  password: z.string(),
  passwordConfirm: z.string,
});

function Register() {
  const navigate = useNavigate();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (
      !data.username ||
      !data.name ||
      !data.password ||
      !data.passwordConfirm
    ) {
      toast.error('Please fill in all the details.');
      return;
    }

    if (data.password != data.passwordConfirm) {
      toast.error('Passwords do not match.');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', registerUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(
      JSON.stringify({
        username: data.username,
        password: data.password,
        name: data.name,
      })
    );
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status < 300) {
        toast.success('Registration successful.');

        navigate('/login');
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
            <b>Register</b>
          </h1>
          <Form {...form}>
            <form
              className="flex flex-col gap-2.5"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g: John" {...field} />
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
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit">Register</Button>
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

export default Register;
