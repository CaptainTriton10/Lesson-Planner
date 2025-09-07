import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  });

  const onSubmit = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/lesson/create');
    xhr.setRequestHeader('Content-Type', 'application/json');

    const token = localStorage.getItem('token');
    if (!token) return toast.error('No token provided.');

    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(
      JSON.stringify({
        authorId: 'abcde',
        lessonName: 'Maths',
        lessonTitle: 'Intro to surds',
        date: '2025-09-07',
        period: '9',
        room: 'Y22',
      })
    );
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status < 300) {
        toast.success('Lesson created successfully.');
      } else {
        toast.error('Unsuccessful');
      }
    };
  };

  return (
    <div className="w-vw h-screen flex justify-center">
      <div className="w-xl h-full flex flex-col content-center flex-wrap">
        <h1 className="text-6xl text-center mt-50">Hello, James.</h1>
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
  );
}

export default Home;
