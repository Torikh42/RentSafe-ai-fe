import { Card } from '@/components/ui/card';

interface ActivityItem {
  title: string;
  detail: string;
  time: Date;
  color: string;
}

interface LiveActivityLogCardProps {
  activities: ActivityItem[];
}

export function LiveActivityLogCard({ activities }: LiveActivityLogCardProps) {
  return (
    <Card className="rounded-xl border border-secondary-100 bg-white p-6 shadow-sm">
      <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-primary-900 mb-6">
        Live Activity Log
      </h3>
      {activities.length === 0 ? (
        <p className="text-xs text-secondary-400 text-center py-6">
          No recent transactions or bookings recorded yet.
        </p>
      ) : (
        <div className="relative space-y-6 before:absolute before:left-2 before:top-2 before:h-[80%] before:w-0.5 before:bg-secondary-100">
          {activities.map((activity) => (
            <div
              key={`${activity.title}-${activity.time.getTime()}`}
              className="relative pl-6 flex flex-col gap-0.5"
            >
              <span
                className={`absolute left-0.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white ${activity.color} shadow-sm`}
              />
              <p className="text-xs font-bold text-primary-900 leading-tight truncate">
                {activity.title}
              </p>
              <p className="text-[10px] text-secondary-500 leading-normal">
                {activity.detail}
              </p>
              <span className="font-mono text-[9px] text-secondary-400">
                {activity.time.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
