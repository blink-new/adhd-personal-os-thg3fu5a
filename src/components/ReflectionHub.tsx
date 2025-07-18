import { useState } from 'react'
import { TrendingUp, Calendar, Brain, Target, Zap, Clock, Award, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface DailyReflection {
  id: string
  date: string
  energyLevel: number
  focusQuality: number
  anxietyLevel: number
  accomplishments: string
  challenges: string
  improvements: string
  mood: string
}

interface ProductivityInsight {
  id: string
  title: string
  description: string
  type: 'pattern' | 'improvement' | 'achievement'
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
}

export function ReflectionHub() {
  const [isReflecting, setIsReflecting] = useState(false)
  const [currentReflection, setCurrentReflection] = useState({
    energyLevel: [7],
    focusQuality: [6],
    anxietyLevel: [4],
    accomplishments: '',
    challenges: '',
    improvements: '',
    mood: 'neutral'
  })

  // Mock data for reflections
  const [reflections] = useState<DailyReflection[]>([
    {
      id: '1',
      date: '2025-07-17',
      energyLevel: 8,
      focusQuality: 7,
      anxietyLevel: 3,
      accomplishments: 'Completed project proposal, had productive team meeting',
      challenges: 'Got distracted by emails in the afternoon',
      improvements: 'Need to batch email checking to specific times',
      mood: 'accomplished'
    },
    {
      id: '2',
      date: '2025-07-16',
      energyLevel: 6,
      focusQuality: 5,
      anxietyLevel: 6,
      accomplishments: 'Finished code review, started documentation',
      challenges: 'Unexpected urgent request disrupted my flow',
      improvements: 'Better communication about priorities with team',
      mood: 'frustrated'
    }
  ])

  // Mock productivity insights
  const insights: ProductivityInsight[] = [
    {
      id: '1',
      title: 'Morning Energy Peak',
      description: 'Your energy levels are consistently highest between 9-11 AM. Schedule your most important tasks during this window.',
      type: 'pattern',
      impact: 'high',
      actionable: true
    },
    {
      id: '2',
      title: 'Email Distraction Pattern',
      description: 'You\'ve mentioned email distractions 4 times this week. Consider batching email checks to 3 specific times per day.',
      type: 'improvement',
      impact: 'medium',
      actionable: true
    },
    {
      id: '3',
      title: 'Estimation Accuracy Improving',
      description: 'Your time estimation accuracy has improved from 65% to 78% over the past two weeks. Great progress!',
      type: 'achievement',
      impact: 'high',
      actionable: false
    },
    {
      id: '4',
      title: 'Anxiety Triggers',
      description: 'Unexpected requests are your primary anxiety trigger. Building buffer time into your schedule could help.',
      type: 'pattern',
      impact: 'medium',
      actionable: true
    }
  ]

  const weeklyStats = {
    averageEnergy: 7.2,
    averageFocus: 6.8,
    averageAnxiety: 4.1,
    tasksCompleted: 24,
    estimationAccuracy: 78,
    focusHours: 32.5,
    distractionEvents: 12
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <BarChart3 className="w-4 h-4" />
      case 'improvement': return <Target className="w-4 h-4" />
      case 'achievement': return <Award className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const getInsightColor = (type: string, impact: string) => {
    if (type === 'achievement') return 'bg-green-100 text-green-800 border-green-200'
    if (impact === 'high') return 'bg-red-100 text-red-800 border-red-200'
    if (impact === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-blue-100 text-blue-800 border-blue-200'
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'accomplished': return '🎯'
      case 'frustrated': return '😤'
      case 'energized': return '⚡'
      case 'calm': return '😌'
      case 'overwhelmed': return '😰'
      default: return '😐'
    }
  }

  const handleSaveReflection = () => {
    // In a real app, this would save to the database
    console.log('Saving reflection:', {
      ...currentReflection,
      date: new Date().toISOString().split('T')[0]
    })
    
    setCurrentReflection({
      energyLevel: [7],
      focusQuality: [6],
      anxietyLevel: [4],
      accomplishments: '',
      challenges: '',
      improvements: '',
      mood: 'neutral'
    })
    setIsReflecting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Reflection Hub</h2>
          <p className="text-slate-600">Analyze patterns and improve your productivity</p>
        </div>
        <Button onClick={() => setIsReflecting(true)}>
          <Calendar className="w-4 h-4 mr-2" />
          Daily Reflection
        </Button>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>This Week's Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-2xl font-bold text-slate-900">{weeklyStats.averageEnergy}</span>
                  </div>
                  <p className="text-sm text-slate-600">Avg Energy</p>
                  <Progress value={weeklyStats.averageEnergy * 10} className="mt-2 h-1" />
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span className="text-2xl font-bold text-slate-900">{weeklyStats.averageFocus}</span>
                  </div>
                  <p className="text-sm text-slate-600">Avg Focus</p>
                  <Progress value={weeklyStats.averageFocus * 10} className="mt-2 h-1" />
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-2xl font-bold text-slate-900">{weeklyStats.estimationAccuracy}%</span>
                  </div>
                  <p className="text-sm text-slate-600">Estimation Accuracy</p>
                  <Progress value={weeklyStats.estimationAccuracy} className="mt-2 h-1" />
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-2xl font-bold text-slate-900">{weeklyStats.focusHours}</span>
                  </div>
                  <p className="text-sm text-slate-600">Focus Hours</p>
                  <Progress value={(weeklyStats.focusHours / 40) * 100} className="mt-2 h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Generated Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Productivity Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-4 border-2 rounded-lg ${getInsightColor(insight.type, insight.impact)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getInsightIcon(insight.type)}
                        <h4 className="font-medium">{insight.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {insight.impact} impact
                        </Badge>
                        {insight.actionable && (
                          <Badge variant="outline" className="text-xs">
                            Actionable
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm">{insight.description}</p>
                    {insight.actionable && (
                      <Button variant="outline" size="sm" className="mt-3">
                        Take Action
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Detailed analytics charts coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {reflections.map((reflection) => (
            <Card key={reflection.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{new Date(reflection.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span className="text-2xl">{getMoodEmoji(reflection.mood)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-amber-600">{reflection.energyLevel}/10</div>
                    <div className="text-sm text-slate-600">Energy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{reflection.focusQuality}/10</div>
                    <div className="text-sm text-slate-600">Focus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{reflection.anxietyLevel}/10</div>
                    <div className="text-sm text-slate-600">Anxiety</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-slate-700 mb-1">Accomplishments</h5>
                    <p className="text-slate-600">{reflection.accomplishments}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-700 mb-1">Challenges</h5>
                    <p className="text-slate-600">{reflection.challenges}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-700 mb-1">Improvements</h5>
                    <p className="text-slate-600">{reflection.improvements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Daily Reflection Modal */}
      {isReflecting && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-y-auto">
          <CardHeader>
            <CardTitle>Daily Reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Energy Level (1-10)</Label>
                <Slider
                  value={currentReflection.energyLevel}
                  onValueChange={(value) => setCurrentReflection(prev => ({ ...prev, energyLevel: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="text-center mt-1 text-sm text-slate-600">
                  {currentReflection.energyLevel[0]}
                </div>
              </div>

              <div>
                <Label>Focus Quality (1-10)</Label>
                <Slider
                  value={currentReflection.focusQuality}
                  onValueChange={(value) => setCurrentReflection(prev => ({ ...prev, focusQuality: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="text-center mt-1 text-sm text-slate-600">
                  {currentReflection.focusQuality[0]}
                </div>
              </div>

              <div>
                <Label>Anxiety Level (1-10)</Label>
                <Slider
                  value={currentReflection.anxietyLevel}
                  onValueChange={(value) => setCurrentReflection(prev => ({ ...prev, anxietyLevel: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="text-center mt-1 text-sm text-slate-600">
                  {currentReflection.anxietyLevel[0]}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="accomplishments">What did you accomplish today?</Label>
              <Textarea
                id="accomplishments"
                value={currentReflection.accomplishments}
                onChange={(e) => setCurrentReflection(prev => ({ ...prev, accomplishments: e.target.value }))}
                placeholder="List your wins, big and small..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="challenges">What challenges did you face?</Label>
              <Textarea
                id="challenges"
                value={currentReflection.challenges}
                onChange={(e) => setCurrentReflection(prev => ({ ...prev, challenges: e.target.value }))}
                placeholder="What got in your way or felt difficult?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="improvements">What could you improve tomorrow?</Label>
              <Textarea
                id="improvements"
                value={currentReflection.improvements}
                onChange={(e) => setCurrentReflection(prev => ({ ...prev, improvements: e.target.value }))}
                placeholder="Ideas for making tomorrow better..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsReflecting(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveReflection}>
                Save Reflection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}