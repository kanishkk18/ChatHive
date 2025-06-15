'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { GET_USERINFO_ROUTE } from "@/lib/constants";
import { useAppStore } from "@/store";

export default function Home() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USERINFO_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
          if (response.data.profileSetup) {
            router.push("/chat");
          } else {
            router.push("/profile");
          }
        } else {
          setUserInfo(undefined);
          router.push("/auth");
        }
      } catch (error) {
        setUserInfo(undefined);
        router.push("/welcome");
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
      if (userInfo.profileSetup) {
        router.push("/chat");
      } else {
        router.push("/profile");
      }
    }
  }, [userInfo, setUserInfo, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <div>Loading...</div>
      </div>
    );
  }

  return null;
}