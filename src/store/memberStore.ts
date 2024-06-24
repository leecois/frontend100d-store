import { fetchMemberProfile, updateMemberInfo } from "@/api/auth";
import axiosClient from "@/api/axiosClient";
import { create } from "zustand";

interface Member {
  _id: string;
  membername: string;
  email: string;
  YOB: number;
  isAdmin: boolean;
}

interface MemberStore {
  member: Member | null;
  fetchProfile: () => void;
  updateProfile: (memberData: { membername: string; YOB: number }) => void;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmNewPassword: string) => Promise<void>;
}

export const useMemberStore = create<MemberStore>((set) => ({
  member: null,
  fetchProfile: async () => {
    try {
      const profile = await fetchMemberProfile();
      set({ member: profile });
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  },
  updateProfile: async (memberData) => {
    try {
        const member = JSON.parse(localStorage.getItem("user") || "");
      if (!member._id) {
        throw new Error("No member ID found in localStorage");
      }
      const updatedMember = await updateMemberInfo(member._id, memberData);
      set({ member: updatedMember });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  },
  resetPassword: async (email, newPassword) => {
    try {
      await axiosClient.post("/auth/reset-password", { email, newPassword });
      alert("Password reset successfully!");
    } catch (error) {
      console.error("Failed to reset password", error);
      alert("Failed to reset password");
    }
  },
  changePassword: async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      const member = JSON.parse(localStorage.getItem("user") || "");

      if (!member._id) {
        throw new Error("No member ID found in localStorage");
      }
      await axiosClient.post(`/auth/change-password/${member._id}`, { currentPassword, newPassword, confirmNewPassword });
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Failed to change password", error);
      alert("Failed to change password");
    }
  },
}));
