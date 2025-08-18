import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  color: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{change}</p>
        </div>
      </div>
    </div>
  );
}
