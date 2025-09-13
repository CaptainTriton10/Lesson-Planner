import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AvatarDropdown from '@/components/AvatarDropdown';
import { nameUrl } from '@/lib/urls';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NowCard() {
  return (
    <div className="h-50 w-full mb-5 border rounded-lg flex flex-col">
      <div className="basis-1/4 p-4">
        <span className="text-2xl">Period 6b</span>
      </div>
      <Separator />
      <div className="basis-3/4 flex flex-col p-4">
        <span className="text-3xl">
          <b>Maths</b>
        </span>
        <span className="text-xs">
          <i>Photography 1</i>
        </span>
        <span className="">Note: Bring camera to lesson</span>
      </div>
    </div>
  );
}

interface UserPayload extends JwtPayload {
  username: string;
  id: string;
}

async function getName(token: string): Promise<string> {
  const res = await fetch(nameUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.text();
}

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserPayload>();
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const decoded = jwtDecode<UserPayload>(token);
    setUser(decoded);

    getName(token).then(
      (name: string) => {
        setName(name);
      },
      () => {
        setName('error');
      }
    );
  }, []);

  return (
    <div className="vw h-screen flex flex-col justify-center">
      <div className="basis-1/12 flex p-2.5 justify-end">
        <AvatarDropdown name={name} />
      </div>
      <div className="w-vw h-full flex justify-center">
        <div className="w-xl h-full flex flex-col content-center flex-wrap">
          <h1 className="text-6xl text-center mt-50">Hello, {name}.</h1>
          <Button
            variant="outline"
            className="w-40 self-center mt-10"
            onClick={() => navigate('/today')}
          >
            Today
            <ArrowRight />
          </Button>
          <div className="flex-grow" />
          <NowCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
