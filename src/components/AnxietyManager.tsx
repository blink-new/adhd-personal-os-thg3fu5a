import { useState } from 'react'
import { Shield, AlertTriangle, Heart, Brain, CheckCircle, Clock, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AnxietyLog {
  id: string
  trigger: string
  anxietyLevel: number
  copingStrategy: string
  outcome: string
  priorityMaintained: boolean
  timestamp: Date
}

interface CopingStrategy {
  id: string
  name: string
  description: string
  effectiveness: number
  timeRequired: number
  category: 'breathing' | 'grounding' | 'cognitive' | 'physical'
}

export function AnxietyManager() {
  const [currentAnxietyLevel, setCurrentAnxietyLevel] = useState([3])
  const [isLogging, setIsLogging] = useState(false)
  const [newLog, setNewLog] = useState({
    trigger: '',
    copingStrategy: '',
    outcome: '',
    priorityMaintained: false
  })

  // Mock data for coping strategies
  const copingStrategies: CopingStrategy[] = [
    {
      id: '1',
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8',
      effectiveness: 85,
      timeRequired: 2,
      category: 'breathing'
    },
    {
      id: '2',
      name: '5-4-3-2-1 Grounding',
      description: '5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste',
      effectiveness: 78,
      timeRequired: 3,
      category: 'grounding'
    },
    {
      id: '3',
      name: 'Priority Anchor',
      description: 'Remind yourself of your top 3 priorities for today',
      effectiveness: 72,
      timeRequired: 1,
      category: 'cognitive'
    },
    {
      id: '4',
      name: 'Quick Walk',
      description: 'Take a 5-minute walk to reset your mind',
      effectiveness: 80,
      timeRequired: 5,
      category: 'physical'
    }
  ]

  // Mock anxiety logs
  const [anxietyLogs] = useState<AnxietyLog[]>([
    {
      id: '1',
      trigger: 'Unexpected meeting request',
      anxietyLevel: 7,
      copingStrategy: '4-7-8 Breathing',
      outcome: 'Managed to reschedule and maintain focus',
      priorityMaintained: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      trigger: 'Email about urgent deadline',
      anxietyLevel: 8,
      copingStrategy: 'Priority Anchor',
      outcome: 'Clarified actual urgency, not as critical as thought',
      priorityMaintained: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breathing': return <Heart className="w-4 h-4" />
      case 'grounding': return <Target className="w-4 h-4" />
      case 'cognitive': return <Brain className="w-4 h-4" />
      case 'physical': return <Clock className="w-4 h-4" />
      default: return <Shield className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breathing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'grounding': return 'bg-green-100 text-green-800 border-green-200'
      case 'cognitive': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'physical': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAnxietyLevelColor = (level: number) => {
    if (level <= 3) return 'text-green-600'
    if (level <= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleLogAnxiety = () => {
    // In a real app, this would save to the database
    console.log('Logging anxiety:', {
      ...newLog,
      anxietyLevel: currentAnxietyLevel[0],
      timestamp: new Date()
    })
    
    setNewLog({
      trigger: '',
      copingStrategy: '',
      outcome: '',
      priorityMaintained: false
    })
    setIsLogging(false)
  }

  return (
    <div className="space-y-6">
      {/* Current State Check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span>Anxiety Check-in</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium">How are you feeling right now? (1-10)</Label>
            <div className="mt-2 space-y-2">
              <Slider
                value={currentAnxietyLevel}
                onValueChange={setCurrentAnxietyLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Calm</span>
                <span className={`font-medium ${getAnxietyLevelColor(currentAnxietyLevel[0])}`}>
                  Level {currentAnxietyLevel[0]}
                </span>
                <span>Very Anxious</span>
              </div>
            </div>
          </div>

          {currentAnxietyLevel[0] > 5 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                  Elevated anxiety detected
                </span>
              </div>
              <p className="text-sm text-amber-700 mb-3">
                Let's try a coping strategy to help you feel more centered.
              </p>
              <Button 
                size="sm" 
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => setIsLogging(true)}
              >
                Start Coping Strategy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coping Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Coping Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copingStrategies.map((strategy) => (
              <div
                key={strategy.id}
                className="p-4 border-2 border-slate-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded border ${getCategoryColor(strategy.category)}`}>
                      {getCategoryIcon(strategy.category)}
                    </div>
                    <h4 className="font-medium text-slate-900">{strategy.name}</h4>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {strategy.timeRequired}min
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-600 mb-3">{strategy.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Effectiveness</span>
                    <span className="font-medium">{strategy.effectiveness}%</span>
                  </div>
                  <Progress value={strategy.effectiveness} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Anxiety Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Anxiety Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {anxietyLogs.map((log) => (
              <div key={log.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900">{log.trigger}</h4>
                    <p className="text-sm text-slate-500">
                      {log.timestamp.toLocaleDateString()} at {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={log.priorityMaintained ? 'default' : 'destructive'}>
                      {log.priorityMaintained ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Priorities Maintained
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Priorities Affected
                        </>
                      )}
                    </Badge>
                    <span className={`text-sm font-medium ${getAnxietyLevelColor(log.anxietyLevel)}`}>
                      Level {log.anxietyLevel}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Strategy Used:</span>
                    <p className="text-slate-600">{log.copingStrategy}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Outcome:</span>
                    <p className="text-slate-600">{log.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Log New Anxiety Event */}
      {isLogging && (
        <Card>
          <CardHeader>
            <CardTitle>Log Anxiety Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trigger">What triggered this anxiety?</Label>
              <Textarea
                id="trigger"
                value={newLog.trigger}
                onChange={(e) => setNewLog(prev => ({ ...prev, trigger: e.target.value }))}
                placeholder="Describe what happened..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="strategy">Coping strategy used</Label>
              <Select value={newLog.copingStrategy} onValueChange={(value) => setNewLog(prev => ({ ...prev, copingStrategy: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a strategy" />
                </SelectTrigger>
                <SelectContent>
                  {copingStrategies.map((strategy) => (
                    <SelectItem key={strategy.id} value={strategy.name}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="outcome">How did it go?</Label>
              <Textarea
                id="outcome"
                value={newLog.outcome}
                onChange={(e) => setNewLog(prev => ({ ...prev, outcome: e.target.value }))}
                placeholder="Describe the outcome..."
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="priorityMaintained"
                checked={newLog.priorityMaintained}
                onChange={(e) => setNewLog(prev => ({ ...prev, priorityMaintained: e.target.checked }))}
                className="rounded border-slate-300"
              />
              <Label htmlFor="priorityMaintained" className="text-sm">
                I was able to maintain my priorities
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsLogging(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogAnxiety}>
                Save Log
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}