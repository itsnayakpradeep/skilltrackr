"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FaTachometerAlt, 
  FaChartLine, 
  FaTasks, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
    { name: "Analytics", href: "/dashboard/analytics", icon: FaChartLine },
    { name: "Skills", href: "/dashboard/skills", icon: FaTasks },
    { name: "Profile", href: "/dashboard/profile", icon: FaUser },
    { name: "Settings", href: "/dashboard/settings", icon: FaCog },
  ];

  const handleSignOut = async () => {
    // This would be replaced with actual NextAuth signOut
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/SkillTrackrlogo.svg"
              alt="SkillTrackr"
              width={120}
              height={35}
              className="object-contain"
            />
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 bg-white shadow-sm px-4 lg:px-8">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center ml-auto">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session?.user?.name || "User"}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {(session?.user?.name || "U").charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
