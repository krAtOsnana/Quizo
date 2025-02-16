
import { Dispatch, SetStateAction } from 'react';
import { Button } from './button';
import useLogout from '@/hooks/useLogout';

const Hero = ({myQuizzesPage , setMyQuizzesPage}: {myQuizzesPage: boolean, setMyQuizzesPage: Dispatch<SetStateAction<boolean>> } ) => {
    const { logout } = useLogout();
  return (
    <div className='flex flex-col justify-center h-full p-12'>
      <div className="h-full bg-gradient-to-br  text-white flex flex-col items-center justify-center px-4 relative">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          Welcome to <span className="text-primary text-[#540d0d]">Quizo</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto">
          "Create quizzes effortlessly, test your knowledge, challenge your
          friends, and climb the leaderboard!"
        </p>

        
        <div className="flex justify-center gap-4 mt-4">
          
          <Button className=" " onClick={logout} variant="destructive">
            LogOut
          </Button>
          <Button variant='secondary' className='text-black' onClick={()=>setMyQuizzesPage(!myQuizzesPage)}>
            {!myQuizzesPage ? 'Create Quiz' : 'My Quizzes'}
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hero
