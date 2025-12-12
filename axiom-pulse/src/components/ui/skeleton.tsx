import { cn } from '@/lib/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'shimmer';
}

export function Skeleton({ className, variant = 'shimmer', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-muted',
        variant === 'shimmer' &&
          'animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:1000px_100%]',
        className
      )}
      {...props}
    />
  );
}