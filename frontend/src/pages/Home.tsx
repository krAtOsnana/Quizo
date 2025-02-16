import MyQuiz from "@/components/MyQuiz";
import QuizForm from "@/components/QuizForm";
import Hero from "@/components/ui/Hero";
import { useState } from "react";


const Home = () => {
  
   const [myQuizzesPage, setMyQuizzesPage] = useState(false)

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Hero Section - Fixed on the left */}
      <div className="sticky top-0 h-screen bg-gradient-to-br  overflow-hidden">
        <Hero myQuizzesPage={myQuizzesPage}  setMyQuizzesPage={setMyQuizzesPage}/>
      </div>
  
      {/* Form Section - Scrollable on the right */}
      <div className="h-screen overflow-y-auto">
        { myQuizzesPage ?  <QuizForm /> : <MyQuiz/>}
      </div>
    </div>
  );
  
  
  
  
  
};

export default Home;
