import useLogin from "@/hooks/useLogin";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const Login = () => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	const { loading, login } = useLogin();

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		login(inputs.username, inputs.password);
	};

	return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br ">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg border border-gray-700 p-6 rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-white">
            Login <span className="text-primary">Quizo</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} className="space-y-5">
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
  
            <Link
              to="/signup"
              className="text-sm text-gray-400 hover:text-primary transition"
            >
              Don't have an account?
            </Link>
  
            <Button
              className="w-full mt-2 bg-primary hover:bg-primary/90 transition border border-gray-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
  
};
export default Login;