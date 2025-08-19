"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  FaChartLine, 
  FaStar,
  FaTrophy,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LegendPayload,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";

// Mock data for charts - in real app, this would come from API
const mockAnalyticsData = {
  skillProgress: [
    { month: 'Jan', completed: 2, inProgress: 5, planned: 8 },
    { month: 'Feb', completed: 4, inProgress: 6, planned: 7 },
    { month: 'Mar', completed: 6, inProgress: 7, planned: 6 },
    { month: 'Apr', completed: 8, inProgress: 8, planned: 5 },
    { month: 'May', completed: 10, inProgress: 9, planned: 4 },
    { month: 'Jun', completed: 12, inProgress: 10, planned: 3 },
  ],
  skillCategories: [
    { name: 'Frontend', value: 35, color: '#3B82F6' },
    { name: 'Backend', value: 25, color: '#10B981' },
    { name: 'DevOps', value: 20, color: '#F59E0B' },
    { name: 'Design', value: 15, color: '#EF4444' },
    { name: 'Soft Skills', value: 5, color: '#8B5CF6' },
  ],
  weeklyActivity: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 1.2 },
  ],
  achievements: [
    { id: 1, name: 'React Master', date: '2024-01-15', icon: '🏆' },
    { id: 2, name: 'TypeScript Pro', date: '2024-02-20', icon: '🥇' },
    { id: 3, name: 'Node.js Expert', date: '2024-03-10', icon: '🚀' },
  ],
  recentSkills: [
    { name: 'React Hooks', progress: 85, lastUpdated: '2 days ago' },
    { name: 'TypeScript Generics', progress: 72, lastUpdated: '1 day ago' },
    { name: 'MongoDB Aggregation', progress: 60, lastUpdated: '3 days ago' },
    { name: 'Docker Containers', progress: 45, lastUpdated: '1 week ago' },
  ]
};

function AnalyticsContentWrapper() {
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
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your learning progress and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <FaChartLine className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Skills</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-green-600">+3 this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <FaTrophy className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-green-600">+2 this week</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <FaClock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours This Week</p>
                <p className="text-2xl font-bold text-gray-900">18.2</p>
                <p className="text-sm text-green-600">+2.5 from last week</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <FaStar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">82%</p>
                <p className="text-sm text-green-600">+5% improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Progress Over Time */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaChartLine className="w-5 h-5 mr-2 text-blue-600" />
              Skill Progress Over Time
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={mockAnalyticsData.skillProgress}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="5 5" 
                    stroke="#e0e7ff" 
                    strokeOpacity={0.5}
                  />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{
                      color: '#111827',
                      fontWeight: 'bold'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                    iconType="line"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Completed"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                    fill="url(#colorCompleted)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inProgress" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="In Progress"
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }}
                    fill="url(#colorInProgress)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="planned" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="Planned"
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
                    fill="url(#colorPlanned)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-700 font-medium">Completed Skills</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-gray-700 font-medium">In Progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-gray-700 font-medium">Planned Skills</span>
              </div>
            </div>
          </div>

          {/* Skill Categories */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaStar className="w-5 h-5 mr-2 text-purple-600" />
              Skills by Category
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <Pie
                    data={mockAnalyticsData.skillCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent = 0, x, y, midAngle = 0, color }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = 125;
                      const xLabel = x + radius * Math.cos(-midAngle * RADIAN);
                      const yLabel = y + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <g>
                          <rect
                            x={xLabel > x ? xLabel : xLabel - 60}
                            y={yLabel - 12}
                            width="60"
                            height="24"
                            rx="12"
                            fill={color}
                            fillOpacity="0.9"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={xLabel > x ? xLabel + 30 : xLabel - 30}
                            y={yLabel}
                            fill="#ffffff"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={12}
                            fontWeight={700}
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                          >
                            {`${name}`}
                          </text>
                          <text
                            x={xLabel > x ? xLabel + 30 : xLabel - 30}
                            y={yLabel + 15}
                            fill="#374151"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={11}
                            fontWeight={600}
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        </g>
                      );
                    }}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    filter="url(#shadow)"
                  >
                    {mockAnalyticsData.skillCategories.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={3}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.15)',
                      padding: '12px'
                    }}
                    formatter={(value: string | number, name: string) => [
                      <span key="value" style={{ color: '#1f2937', fontWeight: 'bold' }}>{`${value}%`}</span>,
                      <span key="name" style={{ color: '#4b5563', fontWeight: '600' }}>{name}</span>
                    ]}
                    labelStyle={{
                      color: '#111827',
                      fontWeight: 'bold',
                      marginBottom: '4px'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    height={48}
                    iconType="rect"
                    iconSize={16}
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value: string | number, entry: LegendPayload) => {
                      const color = entry.color || '#374151';
                      return (
                        <span
                          style={{ 
                            color: color, 
                            fontWeight: 600, 
                            fontSize: '14px',
                            marginLeft: '8px'
                          }}
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {mockAnalyticsData.skillCategories.map((category) => (
                <div 
                  key={category.name} 
                  className="group relative overflow-hidden rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: `${category.color}25` }} />
                  <div className="relative flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2 flex-shrink-0 shadow-sm" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span 
                      className="text-sm font-bold"
                      style={{ color: category.color }}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className="relative mt-1">
                    <div className="text-xs font-semibold"
                        style={{ color: category.color }}>
                      {category.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Activity & Recent Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
            <div className="space-y-3">
              {mockAnalyticsData.weeklyActivity.map((day) => (
                <div key={day.day} className="flex items-center">
                  <span className="w-12 text-sm text-gray-600">{day.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${(day.hours / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{day.hours}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Skills */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Skills</h3>
            <div className="space-y-4">
              {mockAnalyticsData.recentSkills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{skill.name}</p>
                    <p className="text-sm text-gray-500">{skill.lastUpdated}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{skill.progress}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAnalyticsData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{achievement.name}</p>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function AnalyticsPage() {
  return (
    <SessionProvider>
      <AnalyticsContentWrapper />
    </SessionProvider>
  );
}
