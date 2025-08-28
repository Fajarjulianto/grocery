import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string;
  icon: IconType;
  color: "green" | "blue" | "orange" | "teal";
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  const colorClasses = {
    green: "text-green-500 bg-green-100 dark:text-green-100 dark:bg-green-500",
    blue: "text-blue-500 bg-blue-100 dark:text-blue-100 dark:bg-blue-500",
    orange:
      "text-orange-500 bg-orange-100 dark:text-orange-100 dark:bg-orange-500",
    teal: "text-teal-500 bg-teal-100 dark:text-teal-100 dark:bg-teal-500",
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <div className={`p-3 mr-4 rounded-full ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}
