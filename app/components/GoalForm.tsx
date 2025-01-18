'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { abi } from '../contractAbi'

const GoalForm = () => {
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [reward, setReward] = useState('')

  const {
    data: hash,
    isPending,
    writeContract
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000)
    
    writeContract({
      abi,
      address: '0x797110F0b3c04bAefD67ad71c30baf9E52A49578',
      functionName: 'createGoal',
      args: [description, BigInt(deadlineTimestamp)],
      value: parseEther(reward),
    })
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <h2 className="text-2xl font-bold text-white">Create New Goal</h2>
        <p className="text-blue-200 mt-1">Set your goal and stake ETH as motivation</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">Goal Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors pl-5"
            placeholder="Enter your goal description"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-lg bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">Reward (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="w-full rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            placeholder="0.0"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-sm hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? 'Creating Goal...' : 'Create Goal'}
        </button>

        {hash && (
          <div className="p-4 bg-gray-700 rounded-lg text-sm">
            <p className="text-gray-200 font-medium">Transaction Hash:</p>
            <p className="text-gray-400 break-all">{hash}</p>
          </div>
        )}
        
        {isConfirming && (
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Waiting for confirmation...</span>
          </div>
        )}
        
        {isConfirmed && (
          <div className="p-4 bg-green-900/50 rounded-lg text-green-400 flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Goal created successfully!</span>
          </div>
        )}
      </form>
    </div>
  )
}

export default GoalForm