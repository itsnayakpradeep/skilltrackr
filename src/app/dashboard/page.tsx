"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardContent from "../../components/dashboard/DashboardContent";

function DashboardContentWrapper() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContentWrapper />
    </SessionProvider>
  );
}
