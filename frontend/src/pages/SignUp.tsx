import { Link } from "react-router-dom";

import { useState } from "react";
import useSignup from "../hooks/useSignup";
import GenderCheckbox from "@/components/GenderCheckbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender: "male" | "female") => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		signup(inputs);
	};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br ">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg border border-gray-700 p-6 rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-white">
            Sign Up <span className="text-primary">Quizo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                className="h-10 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600"
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                className="h-10 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600"
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                className="h-10 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600"
              />
            </div>
  
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                className="h-10 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600"
              />
            </div>
  
            <GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange} />
            <Link
              to="/login"
              className="text-sm text-gray-400 hover:text-primary transition"
            >
              Already have an account?
            </Link>
  
            <Button
              className="w-full mt-2 bg-primary hover:bg-primary/90 transition border border-gray-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>


        </CardContent>
      </Card>
    </div>
  );
  
};
export default SignUp;