
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";

const Home = () => {
  const { logout } = useLogout();

  return (
    <div className="min-h-screen bg-gradient-to-br  text-white flex flex-col items-center justify-center px-4 relative">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          Welcome to <span className="text-primary">Quizo</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto">
          "Create quizzes effortlessly, test your knowledge, challenge your
          friends, and climb the leaderboard!"
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <Button className="px-6 py-3 text-lg bg-primary hover:bg-primary/90 transition">
            Create Quiz
          </Button>
          <Button className=" " onClick={logout} variant="destructive">
            LogOut
          </Button>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
