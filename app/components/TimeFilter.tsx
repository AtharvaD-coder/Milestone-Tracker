'use client'

import { Clock, Calendar } from 'lucide-react'
import { TimeFilter as TimeFilterType } from './types'

interface TimeFilterProps {
  currentFilter: TimeFilterType;
  onFilterChange: (filter: TimeFilterType) => void;
}

const TimeFilter = ({ currentFilter, onFilterChange }: TimeFilterProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onFilterChange('day')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          currentFilter === 'day'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Clock size={20} />
        Today
      </button>
      <button
        onClick={() => onFilterChange('week')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          currentFilter === 'week'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Calendar size={20} />
        This Week
      </button>
      <button
        onClick={() => onFilterChange('month')}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          currentFilter === 'month'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Calendar size={20} />
        This Month
      </button>
    </div>
  )
}

export default TimeFilter