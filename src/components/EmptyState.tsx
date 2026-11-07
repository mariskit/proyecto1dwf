import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  onActionClick?: () => void
  iconType?: 'star' | 'search'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  actionTo,
  onActionClick,
}) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4">
      {/* Star icon matching reference screenshot */}
      <div className="mb-3 text-slate-300 dark:text-slate-600">
        <Star className="w-12 h-12" />
      </div>

      <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {title}
      </h3>

      {description && (
        <p className="text-xs text-slate-400 mt-1">
          {description}
        </p>
      )}

      {actionTo && actionLabel && (
        <Link
          to={actionTo}
          className="mt-3 text-xs font-medium text-[#00a8e8] hover:underline"
        >
          {actionLabel}
        </Link>
      )}

      {onActionClick && actionLabel && !actionTo && (
        <button
          type="button"
          onClick={onActionClick}
          className="mt-3 text-xs font-medium text-[#00a8e8] hover:underline cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
