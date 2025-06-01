import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/FormInput";
import LoadingButton from "@/components/LoadingButton";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../lib/validation";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";

const SignIn = () => {
  const { signin, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    data: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(formData.data);
    // if (emailError) newErrors.email = emailError;

    const usernameError = validateUsername(formData.data);

    if (usernameError && emailError)
      newErrors.data = usernameError ? usernameError : emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await signin(formData);
      console.log(res);
      if (res && res.data.success) {
        console.log("Navigating to Dashboard")
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google sign in failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const isFormValid =
    formData.data && formData.password && Object.keys(errors).length === 0;

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your AlgoArena account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email"
          type="text"
          placeholder="Enter your email or username"
          value={formData.data}
          onChange={(value) => handleInputChange("data", value)}
          error={errors.data}
          required
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <LoadingButton
          type="submit"
          loading={isLoggingIn}
          disabled={!isFormValid}
          variant="primary"
        >
          Sign In
        </LoadingButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleSignInButton
          onClick={handleGoogleSignIn}
          loading={isLoggingIn}
        />

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
