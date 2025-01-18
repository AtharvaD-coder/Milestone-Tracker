'use client'

import { WorkEntry } from './types'

interface EntryCardProps {
  entry: WorkEntry;
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="border-b border-gray-100 p-4">
        <p className="text-sm text-gray-500">{formatDate(entry.timestamp)}</p>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {entry.content.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-gray-500">{index + 1})</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EntryCard