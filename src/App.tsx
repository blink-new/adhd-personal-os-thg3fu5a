import { useState, useEffect } from 'react'
import { Calendar, Clock, Target, Brain, TrendingUp, Plus, Zap, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TaskCard } from '@/components/TaskCard'
import { WeeklyPlanner } from '@/components/WeeklyPlanner'
import { AnxietyManager } from '@/components/AnxietyManager'
import { ReflectionHub } from '@/components/ReflectionHub'
import { blink } from '@/blink/client'

function App() {
  const [currentWeek] = useState(new Date())
  const [energyLevel, setEnergyLevel] = useState(75)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  const [todayTasks, setTodayTasks] = useState([
    { 
      id: '1', 
      title: 'Review project proposal', 
      description: 'Go through the Q3 project proposal and provide feedback',
      priority: 'high', 
      estimatedMinutes: 45, 
      actualMinutes: null, 
      completed: false,
      energyRequired: 'high',
      category: 'Work'
    },
    { 
      id: '2', 
      title: 'Team standup meeting', 
      description: 'Daily sync with the development team',
      priority: 'medium', 
      estimatedMinutes: 30, 
      actualMinutes: 25, 
      completed: true,
      energyRequired: 'medium',
      category: 'Meetings'
    },
    { 
      id: '3', 
      title: 'Write documentation', 
      description: 'Update API documentation for new endpoints',
      priority: 'medium', 
      estimatedMinutes: 90, 
      actualMinutes: null, 
      completed: false,
      energyRequired: 'medium',
      category: 'Work'
    },
    { 
      id: '4', 
      title: 'Code review', 
      description: 'Review pull requests from team members',
      priority: 'low', 
      estimatedMinutes: 20, 
      actualMinutes: null, 
      completed: false,
      energyRequired: 'low',
      category: 'Work'
    },
  ])

  // Authentication state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const weeklyStats = {
    tasksCompleted: 12,
    totalTasks: 18,
    accurateEstimates: 8,
    totalEstimates: 12,
    focusTime: 24.5,
    targetFocusTime: 30
  }

  // Task management functions
  const handleToggleComplete = (taskId: string) => {
    setTodayTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const handleStartTimer = (taskId: string) => {
    console.log('Starting timer for task:', taskId)
    // Timer logic would go here
  }

  const handleUpdateActualTime = (taskId: string, minutes: number) => {
    setTodayTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, actualMinutes: minutes }
          : task
      )
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <p className="text-slate-600">Loading your Personal OS...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">ADHD Personal OS</h1>
          <p className="text-slate-600 mb-6">Your productivity companion designed specifically for ADHD minds</p>
          <Button onClick={() => blink.auth.login()} className="bg-indigo-600 hover:bg-indigo-700">
            Sign In to Get Started
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">ADHD Personal OS</h1>
                <p className="text-sm text-slate-500">Your productivity companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-slate-700">Energy: {energyLevel}%</span>
                <Progress value={energyLevel} className="w-20 h-2" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Welcome, {user.email?.split('@')[0]}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => blink.auth.logout()}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Sign Out
                </Button>
              </div>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-1" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="reflection" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Reflection</span>
            </TabsTrigger>
            <TabsTrigger value="anxiety" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Anxiety</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Today's Focus */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-indigo-600" />
                      <span>Today's Focus</span>
                    </CardTitle>
                    <CardDescription>
                      Thursday, July 18th • {todayTasks.filter(t => !t.completed).length} tasks remaining
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {todayTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onStartTimer={handleStartTimer}
                        onUpdateActualTime={handleUpdateActualTime}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Weekly Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Tasks Completed</span>
                        <span>{weeklyStats.tasksCompleted}/{weeklyStats.totalTasks}</span>
                      </div>
                      <Progress value={(weeklyStats.tasksCompleted / weeklyStats.totalTasks) * 100} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Estimate Accuracy</span>
                        <span>{weeklyStats.accurateEstimates}/{weeklyStats.totalEstimates}</span>
                      </div>
                      <Progress value={(weeklyStats.accurateEstimates / weeklyStats.totalEstimates) * 100} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Focus Time</span>
                        <span>{weeklyStats.focusTime}h/{weeklyStats.targetFocusTime}h</span>
                      </div>
                      <Progress value={(weeklyStats.focusTime / weeklyStats.targetFocusTime) * 100} />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Start Timer
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Brain className="w-4 h-4 mr-2" />
                      Log Distraction
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Anxiety Check-in
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Weekly Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
                <CardDescription>Your schedule at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {weekDays.map((day, index) => (
                    <div key={day} className={`p-4 rounded-lg border-2 transition-all ${
                      index === 3 ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200'
                    }`}>
                      <h4 className="font-medium text-center mb-2">{day}</h4>
                      <div className="space-y-1">
                        <div className="h-2 bg-indigo-200 rounded"></div>
                        <div className="h-2 bg-amber-200 rounded"></div>
                        <div className="h-2 bg-green-200 rounded"></div>
                      </div>
                      <p className="text-xs text-center mt-2 text-slate-500">
                        {index === 3 ? 'Today' : `${2 + index} tasks`}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planner">
            <WeeklyPlanner currentWeek={currentWeek} />
          </TabsContent>

          <TabsContent value="tracker">
            <Card>
              <CardHeader>
                <CardTitle>Time Tracker</CardTitle>
                <CardDescription>Track and refine your time estimates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Advanced time tracking features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reflection">
            <ReflectionHub />
          </TabsContent>

          <TabsContent value="anxiety">
            <AnxietyManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App