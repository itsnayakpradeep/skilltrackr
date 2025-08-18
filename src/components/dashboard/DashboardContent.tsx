
"use client";

import { useState } from "react";
import { FaPlus, FaChartLine, FaTasks, FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import SkillProgressCard from "@components/dashboard/SkillProgressCard";
import RecentActivity from "@components/dashboard/RecentActivity";
import StatsCard from "@components/dashboard/StatsCard";

export default function DashboardContent() {
  const [skills] = useState([
    {
      id: 1,
      name: "React Development",
      progress: 75,
      level: "Intermediate",
      lastUpdated: "2 days ago",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "TypeScript",
      progress: 60,
      level: "Intermediate",
      lastUpdated: "1 week ago",
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Node.js",
      progress: 45,
      level: "Beginner",
      lastUpdated: "3 days ago",
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "UI/UX Design",
      progress: 30,
      level: "Beginner",
      lastUpdated: "5 days ago",
      color: "bg-pink-500"
    }
  ]);

  const stats = [
    {
      title: "Total Skills",
      value: "12",
      change: "+2 this month",
      icon: FaChartLine,
      color: "text-blue-600"
    },
    {
      title: "Completed",
      value: "5",
      change: "+1 this week",
      icon: FaCheckCircle,
      color: "text-green-600"
    },
    {
      title: "In Progress",
      value: "7",
      change: "3 near completion",
      icon: FaClock,
      color: "text-yellow-600"
    },
    {
      title: "Average Score",
      value: "78%",
      change: "+5% from last month",
      icon: FaStar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-1">Track your progress and continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Skills Progress</h2>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  <FaPlus className="w-4 h-4 mr-2" />
                  Add Skill
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {skills.map((skill) => (
                  <SkillProgressCard key={skill.id} {...skill} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all">
            <FaChartLine className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-600">Track your progress</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all">
            <FaTasks className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-gray-900">Manage Skills</h3>
            <p className="text-sm text-gray-600">Update your skills</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all">
            <FaStar className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-gray-900">Set Goals</h3>
            <p className="text-sm text-gray-600">Define new targets</p>
          </button>
        </div>
      </div>
    </div>
  );
}
