import { ConnectButton } from '@rainbow-me/rainbowkit';
import WorkTracker from "./components/WorkTracker";
import GoalForm from "./components/GoalForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-600 to-blue-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Goal Tracker
          </h1>
          <ConnectButton />
        </div>
        
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <WorkTracker />
          <GoalForm />
        </div>
      </div>
    </main>
  );
}