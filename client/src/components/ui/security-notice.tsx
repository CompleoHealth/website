import { AlertCircle } from 'lucide-react';

interface SecurityNoticeProps {
  message: string;
  type?: 'warning' | 'info' | 'error';
}

export function SecurityNotice({ message, type = 'info' }: SecurityNoticeProps) {
  const colorClasses = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[type]}`}>
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}