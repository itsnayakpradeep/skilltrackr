import { FaCheckCircle, FaClock, FaStar } from "react-icons/fa";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "completed",
      title: "Completed React Basics",
      time: "2 hours ago",
      icon: FaCheckCircle,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "progress",
      title: "Started TypeScript Course",
      time: "1 day ago",
      icon: FaClock,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 5-star rating",
      time: "3 days ago",
      icon: FaStar,
      color: "text-yellow-500"
    },
    {
      id: 4,
      type: "completed",
      title: "Finished Node.js Tutorial",
      time: "5 days ago",
      icon: FaCheckCircle,
      color: "text-green-500"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
