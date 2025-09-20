import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner = ({ size = 'md', text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="islamic-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full loading-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 loading-pulse" />
                <div className="h-3 w-24 loading-pulse" />
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="h-5 w-24 loading-pulse" />
              <div className="h-3 w-16 loading-pulse" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="h-3 w-16 loading-pulse" />
            <div className="flex space-x-2">
              <div className="h-8 w-8 rounded loading-pulse" />
              <div className="h-8 w-8 rounded loading-pulse" />
              <div className="h-8 w-8 rounded loading-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};