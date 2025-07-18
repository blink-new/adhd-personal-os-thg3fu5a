import { useState } from 'react'
import { Calendar, Plus, Clock, Zap, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface TimeBlock {
  id: string
  title: string
  startTime: string
  endTime: string
  date: string
  type: 'task' | 'break' | 'buffer' | 'focus' | 'meeting'
  priority: 'low' | 'medium' | 'high'
  energyRequired: 'low' | 'medium' | 'high'
}

interface WeeklyPlannerProps {
  currentWeek: Date
}

export function WeeklyPlanner({ currentWeek }: WeeklyPlannerProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isAddingBlock, setIsAddingBlock] = useState(false)
  const [newBlock, setNewBlock] = useState({
    title: '',
    startTime: '',
    endTime: '',
    type: 'task' as const,
    priority: 'medium' as const,
    energyRequired: 'medium' as const,
    description: ''
  })

  // Mock data for time blocks
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    {
      id: '1',
      title: 'Morning Planning',
      startTime: '09:00',
      endTime: '09:30',
      date: '2025-07-18',
      type: 'focus',
      priority: 'high',
      energyRequired: 'high'
    },
    {
      id: '2',
      title: 'Project Review',
      startTime: '10:00',
      endTime: '11:30',
      date: '2025-07-18',
      type: 'task',
      priority: 'high',
      energyRequired: 'high'
    },
    {
      id: '3',
      title: 'Break',
      startTime: '11:30',
      endTime: '11:45',
      date: '2025-07-18',
      type: 'break',
      priority: 'low',
      energyRequired: 'low'
    }
  ])

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })

  const getWeekDates = (startDate: Date) => {
    const dates = []
    const start = new Date(startDate)
    start.setDate(start.getDate() - start.getDay() + 1) // Start from Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  const getBlocksForDate = (date: string) => {
    return timeBlocks.filter(block => block.date === date)
  }

  const getBlockColor = (type: string, priority: string) => {
    if (type === 'break') return 'bg-green-100 border-green-300 text-green-800'
    if (type === 'buffer') return 'bg-gray-100 border-gray-300 text-gray-800'
    if (type === 'focus') return 'bg-purple-100 border-purple-300 text-purple-800'
    if (type === 'meeting') return 'bg-blue-100 border-blue-300 text-blue-800'
    
    // Task blocks colored by priority
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800'
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'low': return 'bg-indigo-100 border-indigo-300 text-indigo-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const handleAddBlock = () => {
    if (!selectedDate || !newBlock.title || !newBlock.startTime || !newBlock.endTime) return

    const block: TimeBlock = {
      id: Date.now().toString(),
      title: newBlock.title,
      startTime: newBlock.startTime,
      endTime: newBlock.endTime,
      date: selectedDate,
      type: newBlock.type,
      priority: newBlock.priority,
      energyRequired: newBlock.energyRequired
    }

    setTimeBlocks([...timeBlocks, block])
    setNewBlock({
      title: '',
      startTime: '',
      endTime: '',
      type: 'task',
      priority: 'medium',
      energyRequired: 'medium',
      description: ''
    })
    setIsAddingBlock(false)
    setSelectedDate(null)
  }

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Weekly Planner</h2>
          <p className="text-slate-600">
            Week of {new Date(weekDates[0]).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })} - {new Date(weekDates[6]).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Energy-based scheduling
          </Badge>
          <Badge variant="outline" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            20% buffer time included
          </Badge>
        </div>
      </div>

      {/* Weekly Grid */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-8 gap-4">
            {/* Time column */}
            <div className="space-y-2">
              <div className="h-12 flex items-center justify-center text-sm font-medium text-slate-600">
                Time
              </div>
              {timeSlots.filter((_, i) => i >= 8 && i <= 20).map((time) => (
                <div key={time} className="h-16 flex items-center justify-center text-xs text-slate-500 border-t border-slate-100">
                  {time}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIndex) => {
              const date = weekDates[dayIndex]
              const dayBlocks = getBlocksForDate(date)
              const isToday = date === new Date().toISOString().split('T')[0]

              return (
                <div key={day} className="space-y-2">
                  <div className={`h-12 flex flex-col items-center justify-center rounded-lg border-2 transition-colors ${
                    isToday 
                      ? 'bg-indigo-50 border-indigo-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-sm font-medium text-slate-900">{day}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(date).getDate()}
                    </div>
                  </div>

                  {/* Time slots for this day */}
                  <div className="space-y-1 relative">
                    {timeSlots.filter((_, i) => i >= 8 && i <= 20).map((time, timeIndex) => {
                      const blocksAtTime = dayBlocks.filter(block => {
                        const blockStart = parseInt(block.startTime.split(':')[0])
                        const slotHour = parseInt(time.split(':')[0])
                        const blockEnd = parseInt(block.endTime.split(':')[0])
                        return slotHour >= blockStart && slotHour < blockEnd
                      })

                      return (
                        <div
                          key={`${date}-${time}`}
                          className="h-16 border border-slate-100 rounded relative group hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedDate(date)
                            setNewBlock(prev => ({ ...prev, startTime: time }))
                            setIsAddingBlock(true)
                          }}
                        >
                          {blocksAtTime.map((block) => (
                            <div
                              key={block.id}
                              className={`absolute inset-1 rounded text-xs p-2 border-2 ${getBlockColor(block.type, block.priority)}`}
                            >
                              <div className="font-medium truncate">{block.title}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{block.startTime}-{block.endTime}</span>
                                <Zap className="w-3 h-3" />
                              </div>
                            </div>
                          ))}
                          
                          {blocksAtTime.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus className="w-4 h-4 text-slate-400" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Time Block Dialog */}
      <Dialog open={isAddingBlock} onOpenChange={setIsAddingBlock}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Time Block</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newBlock.title}
                onChange={(e) => setNewBlock(prev => ({ ...prev, title: e.target.value }))}
                placeholder="What are you working on?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newBlock.startTime}
                  onChange={(e) => setNewBlock(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newBlock.endTime}
                  onChange={(e) => setNewBlock(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newBlock.type} onValueChange={(value: any) => setNewBlock(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="focus">Focus Time</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="break">Break</SelectItem>
                    <SelectItem value="buffer">Buffer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newBlock.priority} onValueChange={(value: any) => setNewBlock(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="energy">Energy</Label>
                <Select value={newBlock.energyRequired} onValueChange={(value: any) => setNewBlock(prev => ({ ...prev, energyRequired: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newBlock.description}
                onChange={(e) => setNewBlock(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Additional details..."
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingBlock(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBlock}>
                Add Block
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}