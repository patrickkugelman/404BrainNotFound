
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both email and password.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, we would validate against a backend service
      // For demo, we'll check if a user exists in localStorage
      const storedUserJSON = localStorage.getItem("partyUser");
      
      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        
        if (storedUser.email === email) {
          // Password isn't actually checked in this demo
          localStorage.setItem("isLoggedIn", "true");
          
          toast({
            title: "Logged in successfully",
            description: "Welcome back to Cluj Party Mapster!",
          });
          
          if (onSuccess) {
            onSuccess();
          } else {
            navigate("/map");
          }
          return;
        }
      }
      
      // If we get here, login failed
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-muted"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="bg-muted"
          />
        </div>
      </div>
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full party-button">
        {isLoading ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
