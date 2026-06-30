"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Separator, toast } from "@heroui/react";
import { UtensilsCrossed, Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Flavor Flow - Register";
  }, []);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleRegister = async (e) => {
    e.preventDefault();
    setSignUpError("");

    if (!isPasswordValid) {
      setSignUpError("Please fulfill all password requirements.");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email(
        {
          email,
          password,
          name,
          image: imageUrl,
          role: "user",
          isBlocked: false,
          planId: "free",
          expireAt: null,
          recipeLimit: 2,
        },
        {
          onSuccess: () => {
            toast.success("Registration successful! Please check your email.");
            router.push("/login");
          },
          onError: (ctx) => {
            setSignUpError(ctx.error.message || "Registration failed.");
            setLoading(false);
          },
        },
      );

      if (!result.data?.token) {
        setSignUpError(
          "Account could not be created. Email may already exist.",
        );
        setLoading(false);
        return;
      }
    } catch (err) {
      setSignUpError("Unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-default-200/60 bg-background/50 backdrop-blur-md shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 text-white mb-2">
            <UtensilsCrossed size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Create Your FlavorFlow Account
          </h2>
          <p className="text-sm text-foreground/60">
            Join us to explore and share master-class recipes.
          </p>
        </div>

        {/* Error Feedback */}
        {signUpError && (
          <div className="p-3 text-sm text-rose-500 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center font-medium">
            {signUpError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              variant="bordered"
              radius="xl"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              variant="bordered"
              radius="xl"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Profile Image URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Profile Image URL <span className="text-rose-500">*</span>
            </label>
            <Input
              type="url"
              placeholder="https://example.com/avatar.png"
              variant="bordered"
              radius="xl"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <Input
                placeholder="Create a strong password"
                variant="bordered"
                radius="xl"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isVisible ? "text" : "password"}
                className="w-full"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-default-400 hover:text-default-600 transition-colors focus:outline-none"
              >
                {isVisible ?
                  <EyeOff size={16} />
                : <Eye size={16} />}
              </button>
            </div>

            {/* Password Rules */}
            {password && (
              <div className="p-3 bg-default-50/50 rounded-xl border border-default-100 text-xs space-y-1.5 mt-1 animate-fadeIn">
                <p className="font-medium text-foreground/70 mb-1">
                  Password Requirements:
                </p>
                {[
                  { met: hasMinLength, label: "Minimum 6 characters" },
                  {
                    met: hasUppercase,
                    label: "At least one uppercase letter (A–Z)",
                  },
                  {
                    met: hasLowercase,
                    label: "At least one lowercase letter (a–z)",
                  },
                ].map(({ met, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    {met ?
                      <Check size={14} className="text-green-500" />
                    : <X size={14} className="text-rose-500" />}
                    <span
                      className={
                        met ?
                          "text-green-600 dark:text-green-400"
                        : "text-foreground/50"
                      }
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            radius="xl"
            disabled={loading}
            className="w-full font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all mt-4"
          >
            {loading ?
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Creating Account...
              </span>
            : "Sign Up"}
          </Button>
        </form>

        <Separator className="my-4" />

        <p className="text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
