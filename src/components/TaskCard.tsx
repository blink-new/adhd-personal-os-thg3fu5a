import { useState } from 'react'
import { Clock, Play, Pause, CheckCircle2, Circle, AlertTriangle, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Task {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  estimatedMinutes: number
  actualMinutes?: number
  completed: boolean
  energyRequired: 'low' | 'medium' | 'high'
  category?: string
}

interface TaskCardProps {
  task: Task
  onToggleComplete: (taskId: string) => void
  onStartTimer: (taskId: string) => void
  onUpdateActualTime: (taskId: string, minutes: number) => void
}

export function TaskCard({ task, onToggleComplete, onStartTimer, onUpdateActualTime }: TaskCardProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(task.actualMinutes || 0)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'default'
    }
  }

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case 'high': return <Zap className="w-3 h-3 text-red-500" />
      case 'medium': return <Zap className="w-3 h-3 text-yellow-500" />
      case 'low': return <Zap className="w-3 h-3 text-green-500" />
      default: return <Zap className="w-3 h-3 text-gray-500" />
    }
  }

  const accuracyPercentage = task.actualMinutes && task.estimatedMinutes 
    ? Math.abs(1 - Math.abs(task.actualMinutes - task.estimatedMinutes) / task.estimatedMinutes) * 100
    : null

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      task.completed 
        ? 'bg-green-50 border-green-200 opacity-75' 
        : 'bg-white border-slate-200 hover:border-indigo-300'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="mt-1 transition-colors"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-500" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-sm ${
                task.completed ? 'line-through text-slate-500' : 'text-slate-900'
              }`}>
                {task.title}
              </h4>
              
              {task.description && (
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                  {task.priority}
                </Badge>
                
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  {getEnergyIcon(task.energyRequired)}
                  <span>{task.energyRequired}</span>
                </div>
                
                {task.category && (
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Est: {task.estimatedMinutes}min</span>
                </div>
                
                {task.actualMinutes && (
                  <div className="flex items-center space-x-1">
                    <span>Actual: {task.actualMinutes}min</span>
                    {accuracyPercentage && (
                      <span className={`font-medium ${
                        accuracyPercentage >= 80 ? 'text-green-600' : 
                        accuracyPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        ({Math.round(accuracyPercentage)}% accurate)
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {task.actualMinutes && task.estimatedMinutes && (
                <div className="mt-2">
                  <Progress 
                    value={Math.min((task.actualMinutes / task.estimatedMinutes) * 100, 100)} 
                    className="h-1"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            {!task.completed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsTimerRunning(!isTimerRunning)
                  onStartTimer(task.id)
                }}
                className="text-xs"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}