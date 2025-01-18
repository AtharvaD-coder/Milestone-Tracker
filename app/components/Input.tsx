'use client'

import { useState } from 'react'
import { PlusCircle, Send } from 'lucide-react'
import { WorkEntry } from './types'

interface InputProps {
  onAddEntry: (entry: WorkEntry) => void;
}

const Input = ({ onAddEntry }: InputProps) => {
  const [items, setItems] = useState<string[]>([''])

  const addItem = () => {
    setItems([...items, ''])
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems.length ? newItems : [''])
  }

  const submitEntry = () => {
    const nonEmptyItems = items.filter(item => item.trim())
    if (nonEmptyItems.length > 0) {
      const entry: WorkEntry = {
        id: Date.now().toString(),
        content: nonEmptyItems,
        timestamp: new Date(),
      }
      onAddEntry(entry)
      setItems([''])
    }
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="text-gray-500 min-w-[2rem]">{index + 1})</span>
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addItem()
                }
              }}
              placeholder={`Task ${index + 1}`}
              className="flex-1 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => removeItem(index)}
              className="text-gray-400 hover:text-red-500 p-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={addItem}
          className="px-4 py-2 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add Item
        </button>
        <button
          onClick={submitEntry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Send size={20} />
          Submit Entry
        </button>
      </div>
    </div>
  )
}

export default Input