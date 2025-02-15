import { Button } from '@/components/ui/button';
import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br  text-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          Welcome to <span className="text-primary">Quizo</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-lg mx-auto">
          Test your knowledge, challenge your friends, and climb the leaderboard!
        </p>
  
        <div className="flex justify-center gap-4 mt-4">
          <Button className="px-6 py-3 text-lg bg-primary hover:bg-primary/90 transition">
            Create Quiz
          </Button>
         
        </div>
      </div>
  
      {/* Featured Categories */}
      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">
          Choose a Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {["Science", "Math", "History", "Tech", "Sports", "Movies"].map((category) => (
            <div key={category} className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md text-center cursor-pointer transition hover:bg-primary/30">
              <p className="text-lg font-medium">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Home
