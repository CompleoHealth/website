import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-compleo-gray mb-8", className)}>
      <Link href="/" className="flex items-center hover:text-compleo-teal transition-colors" aria-label="Home">
        <Home className="h-4 w-4" aria-hidden="true" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link 
              href={item.href} 
              className="hover:text-compleo-teal transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-compleo-deep-teal font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}