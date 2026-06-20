"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Separator } from "@heroui/react";
import { authClient, signIn } from "@/app/lib/auth-client";
import { UtensilsCrossed, Eye, EyeOff, Loader2 } from "lucide-react";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // ১. Credential Login (Email + Password)
  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await signIn.email({
        email,
        password,
      });
      if (authError) {
        setError(authError.message || "Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ২. Google Login (OAuth)
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      setError("Failed to initialize Google login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-default-200/60 bg-background/50 backdrop-blur-md shadow-xl space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 text-white mb-2">
            <UtensilsCrossed size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back to FlavorFlow
          </h2>
          <p className="text-sm text-foreground/60">
            Log in to discover and save secret recipes.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 text-sm text-rose-500 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Elements */}
        <form onSubmit={handleCredentialLogin} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            required
            variant="bordered"
            radius="xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />

          <div className="relative flex items-center">
            <Input
              label="Password"
              placeholder="••••••••"
              required
              variant="bordered"
              radius="xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isVisible ? "text" : "password"}
              className="w-full"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 focus:outline-none text-default-400 hover:text-default-600 transition-colors flex items-center justify-center"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ?
                <EyeOff size={16} className="text-default-400" />
              : <Eye size={16} className="text-default-400" />}
            </button>
          </div>

          <div className="flex justify-end pt-1">
            <a href="#" className="text-xs text-orange-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            radius="xl"
            disabled={loading}
            className="w-full font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all mt-2"
          >
            {loading ?
              <Loader2 size={18} className="animate-spin text-white" />
            : "Sign In with Email"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 justify-center">
          <Separator className="w-25" />
          <span className="px-3 text-xs text-foreground/40 uppercase tracking-wider">
            Or continue with
          </span>
          <Separator className="w-25" />
        </div>

        {/* Google Login Button */}
        <Button
          variant="bordered"
          radius="xl"
          onPress={handleGoogleLogin}
          className="w-full font-medium border-default-200 hover:bg-default-100 transition-all text-foreground"
        >
          <Icon icon="devicon:google" />
          Sign In with Google
        </Button>

        {/* Footer Link */}
        <p className="text-center text-sm text-foreground/60">
          Don`t have an account?{" "}
          <a
            href="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
