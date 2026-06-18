"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
import { Input, Button, Separator } from "@heroui/react"; // 👈 Separator-এর জায়গায় Separetor হবে
import {
  UtensilsCrossed,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Image,
  Loader2,
  Check,
  X,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // পাসওয়ার্ড রুলস ভ্যালিডেশন চেক
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  // ইমেজ সিলেক্ট এবং প্রিভিউ হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ImgBB-তে ইমেজ আপলোড করার ফাংশন
  const uploadToImgBB = async (file) => {
    const apiKey =
      process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY";
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed to ImgBB");
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please fulfill all password requirements.");
      return;
    }

    setLoading(true);
    let uploadedImageUrl = "";

    try {
      if (imageFile) {
        setImageUploading(true);
        uploadedImageUrl = await uploadToImgBB(imageFile);
        setImageUploading(false);
      }

      // আপনার Better Auth লজিক এখানে আনকমেন্ট করে নিতে পারেন
    } catch (err) {
      setError(err.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
      setImageUploading(false);
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
        {error && (
          <div className="p-3 text-sm text-rose-500 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center font-medium">
            {error}
          </div>
        )}
        {/* Form */}
        {/* Form Elements */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* 1. Full Name Field */}
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

          {/* 2. Email Address Field */}
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

          {/* 3. Image Upload Block */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Profile Picture <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-default-200 hover:border-orange-500/50 transition-colors relative bg-default-50/30">
              {imagePreview ?
                <Image
                  width={48}
                  height={48}
                  src={imagePreview}
                  alt="Avatar Preview"
                  className="w-12 h-12 rounded-full object-cover border border-default-200"
                />
              : <div className="p-3 rounded-full bg-default-100 text-default-400">
                  <Image size={20} />
                </div>
              }
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">
                  {imageFile ? imageFile.name : "Choose an image file"}
                </p>
                <p className="text-[11px] text-foreground/50">
                  PNG, JPG up to 5MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Password Input Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <Input
                placeholder="Create strong password"
                variant="bordered"
                radius="xl"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isVisible ? "text" : "password"}
                className="w-full"
              />

              {/* Absolute positioned toggle button */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 focus:outline-none text-default-400 hover:text-default-600 transition-colors flex items-center justify-center"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ?
                  <EyeOff size={16} />
                : <Eye size={16} />}
              </button>
            </div>

            {/* Password Real-time Rules UI Check */}
            {password && (
              <div className="p-3 bg-default-50/50 rounded-xl border border-default-100 text-xs space-y-1.5 mt-1 animate-fadeIn">
                <p className="font-medium text-foreground/70 mb-1">
                  Password Requirements:
                </p>
                <div className="flex items-center gap-2">
                  {hasMinLength ?
                    <Check size={14} className="text-green-500" />
                  : <X size={14} className="text-rose-500" />}
                  <span
                    className={
                      hasMinLength ?
                        "text-green-600 dark:text-green-400"
                      : "text-foreground/50"
                    }
                  >
                    Minimum 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasUppercase ?
                    <Check size={14} className="text-green-500" />
                  : <X size={14} className="text-rose-500" />}
                  <span
                    className={
                      hasUppercase ?
                        "text-green-600 dark:text-green-400"
                      : "text-foreground/50"
                    }
                  >
                    At least one uppercase letter (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasLowercase ?
                    <Check size={14} className="text-green-500" />
                  : <X size={14} className="text-rose-500" />}
                  <span
                    className={
                      hasLowercase ?
                        "text-green-600 dark:text-green-400"
                      : "text-foreground/50"
                    }
                  >
                    At least one lowercase letter (a-z)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            radius="xl"
            disabled={loading || imageUploading}
            className="w-full font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all mt-4"
          >
            {loading ?
              <div className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin text-white" />
                <span>
                  {imageUploading ?
                    "Uploading Image..."
                  : "Creating Account..."}
                </span>
              </div>
            : "Sign Up"}
          </Button>
        </form>
        <Separator className="my-4" />{" "}
        {/* 👈 Separator বদলে Separator ব্যবহার করা হয়েছে */}
        {/* Footer Link */}
        <p className="text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
