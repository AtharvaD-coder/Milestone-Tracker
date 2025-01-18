'use client'

import { useState } from 'react'
import Input from './Input'
import TimeFilter from './TimeFilter'
import EntryCard from './EntryCard'
import { WorkEntry, TimeFilter as TimeFilterType } from './types'

const WorkTracker = () => {
  const [entries, setEntries] = useState<WorkEntry[]>([])
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('day')

  const addEntry = (entry: WorkEntry) => {
    setEntries([entry, ...entries])
  }

  const filterEntries = (entries: WorkEntry[]): WorkEntry[] => {
    const now = new Date()
    const startOfDay = new Date(now.setHours(0, 0, 0, 0))
    
    switch (timeFilter) {
      case 'day':
        return entries.filter(entry => new Date(entry.timestamp) >= startOfDay)
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7))
        return entries.filter(entry => new Date(entry.timestamp) >= weekAgo)
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
        return entries.filter(entry => new Date(entry.timestamp) >= monthAgo)
      default:
        return entries
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
        <h2 className="text-2xl font-bold text-white">Work Tracker</h2>
        <p className="text-purple-200 mt-1">Track your progress towards your goals</p>
      </div>

      <div className="p-6 space-y-6">
        <Input onAddEntry={addEntry}  />
        
        <div className="flex items-center justify-between ">
          <h3 className="text-lg font-medium text-gray-200">Your Entries</h3>
          <TimeFilter currentFilter={timeFilter} onFilterChange={setTimeFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterEntries(entries).map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
          {filterEntries(entries).length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-400">
              No entries found for the selected time period
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkTracker