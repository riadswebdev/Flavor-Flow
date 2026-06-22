"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, Input, Button, Chip, toast, ToastProvider } from "@heroui/react";
import {
  Calendar,
  Shield,
  CheckCircle,
  Sparkles,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { uploadToImgBB } from "@/lib/actions/uploadImage";

export default function UserProfile({ data }) {
  const [userData, setUserData] = useState(data);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: userData.name,
    image: userData.image,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setIsSubmitting(true);
      const updateData = {
        name: formData.name,
      };
      let uploadedImageUrl = null;
      if (imageFile) {
        setImageUploading(true);
        uploadedImageUrl = await uploadToImgBB(imageFile);
        console.log("Uploaded URL:", uploadedImageUrl);
        updateData.image = uploadedImageUrl;
        setImageUploading(false);
      }
      await authClient.updateUser(updateData);
      setUserData((prev) => ({
        ...prev,
        name: formData.name,
        image: uploadedImageUrl || prev.image,
        updatedAt: new Date(),
      }));
      setImagePreview("");
      setImageFile(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
      setImageUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      {/* ================= Left Profile OverView Card ================= */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <Card className="p-6 bg-white/60 dark:bg-[#0d1324]/50 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-xl rounded-3xl flex flex-col items-center text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-orange-500 to-rose-600" />

          <div className="relative mt-4 group ">
            <Image
              src={userData?.image}
              alt={`${userData?.name} profile`}
              width={100}
              height={100}
              className="w-full h-full text-large rounded-2xl object-cover"
              fallback={userData?.name.charAt(0)}
            />
            {userData.plan === "premium" && (
              <div className="absolute -bottom-2 -right-2 bg-linear-to-tr from-amber-500 to-orange-600 text-white p-1.5 rounded-xl shadow-md">
                <Sparkles className="size-4 animate-pulse" />
              </div>
            )}
          </div>

          <div className="mt-5 space-y-1">
            <h3 className="text-xl font-black text-neutral-800 dark:text-neutral-100 tracking-tight">
              {userData.name}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
              {userData.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-center mt-4">
            <Chip
              size="sm"
              variant="flat"
              color={userData.role === "admin" ? "secondary" : "warning"}
              className="text-[10px] font-bold uppercase tracking-wider px-2"
            >
              {userData.role}
            </Chip>
            <Chip
              size="sm"
              variant="flat"
              color={userData.plan === "premium" ? "success" : "default"}
              className="text-[10px] font-bold uppercase tracking-wider px-2"
            >
              {userData.plan} Account
            </Chip>
          </div>

          <div className="w-full border-t border-neutral-100 dark:border-neutral-800/60 mt-6 pt-5 text-left space-y-3.5">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-neutral-400 flex items-center gap-2">
                <Calendar className="size-3.5" /> Joined on
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 font-bold">
                {formatDate(userData.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-neutral-400 flex items-center gap-2">
                <Shield className="size-3.5" /> Account ID
              </span>
              <span className="text-neutral-500 font-mono text-[11px] max-w-30 truncate">
                {userData.id}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-neutral-400 flex items-center gap-2">
                <CheckCircle className="size-3.5" /> Status
              </span>
              <span
                className={`font-bold ${userData.isBlocked ? "text-rose-500" : "text-emerald-500"}`}
              >
                {userData.isBlocked ? "Suspended" : "Active Verified"}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* ================= Right Update Profile ================= */}
      <div className="lg:col-span-2">
        <Card className="p-6 sm:p-8 bg-white/60 dark:bg-[#0d1324]/50 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-xl rounded-3xl shadow-sm">
          <div className="mb-6">
            <h4 className="text-lg font-black text-neutral-800 dark:text-neutral-100 tracking-tight">
              Account Settings
            </h4>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Update your public profile name and avatar presentation details
              instantly.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white/50 dark:bg-[#11182c]/40 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl"
              />

              <div className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-default-200 hover:border-orange-500/50 transition-colors relative bg-default-50/30">
                {imagePreview ?
                  <Image
                    src={imagePreview}
                    alt="Avatar Preview"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border border-default-200"
                  />
                : <div className="p-3 rounded-full bg-default-100 text-default-400">
                    <ImageIcon size={20} />
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
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* (Read Only) */}
              <Input
                type="email"
                label="Email Address"
                value={userData.email}
                disabled
                className="bg-neutral-100/60 dark:bg-[#11182c]/20 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl opacity-70 cursor-not-allowed"
              />

              {/* (Read Only) */}
              <Input
                type="text"
                label="Platform Privilege Role"
                value={userData.role.toUpperCase()}
                disabled
                className="bg-neutral-100/60 dark:bg-[#11182c]/20 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl opacity-70 cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800/60 mt-6">
              <Button
                type="submit"
                isDisabled={loading || imageUploading}
                startContent={!isSubmitting && <Save className="size-4" />}
                className="bg-linear-to-r from-orange-500 to-rose-600 text-white font-bold text-xs rounded-xl px-6 shadow-md shadow-orange-500/10 uppercase tracking-wider"
              >
                {isSubmitting ? "Saving Changes..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
