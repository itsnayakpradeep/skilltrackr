interface SkillProgressCardProps {
  name: string;
  progress: number;
  level: string;
  lastUpdated: string;
  color: string;
}

export default function SkillProgressCard({ 
  name, 
  progress, 
  level, 
  lastUpdated, 
  color 
}: SkillProgressCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <span className="text-xs text-gray-500">{level}</span>
      </div>
      
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className={`${color} h-2 rounded-full transition-all duration-300`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
    </div>
  );
}
