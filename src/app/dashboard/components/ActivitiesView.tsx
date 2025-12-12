import { useState } from "react"
import { Activity, ActivityFormData, Event } from "../types/event"
import { ActivityCard } from "./ActivityCard"
import { ActivityForm } from "./ActivityForm"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Plus, Search, Calendar, X } from "lucide-react"
import { Card, CardContent } from "./ui/card"

interface ActivitiesViewProps {
  events: Event[]
  activities: Activity[]
  onCreateActivity: (activityData: ActivityFormData) => void
  onUpdateActivity: (activityId: string, activityData: ActivityFormData) => void
  onDeleteActivity: (activityId: string) => void
}

export function ActivitiesView({
  events,
  activities,
  onCreateActivity,
  onUpdateActivity,
  onDeleteActivity,
}: ActivitiesViewProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>("all")

  const handleCreateActivity = (activityData: ActivityFormData) => {
    onCreateActivity(activityData)
    setShowForm(false)
  }

  const handleUpdateActivity = (activityData: ActivityFormData) => {
    if (!editingActivity) return
    onUpdateActivity(editingActivity.id, activityData)
    setEditingActivity(null)
    setShowForm(false)
  }

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setEditingActivity(null)
    setShowForm(false)
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.speaker?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEvent =
      selectedEventFilter === "all" || activity.eventId === selectedEventFilter

    return matchesSearch && matchesEvent
  })

  // Group activities by event
  const activitiesByEvent = filteredActivities.reduce((acc, activity) => {
    if (!acc[activity.eventId]) {
      acc[activity.eventId] = []
    }
    acc[activity.eventId].push(activity)
    return acc
  }, {} as Record<string, Activity[]>)

  const totalActivities = activities.length
  const filteredCount = filteredActivities.length

  return (
    <div className="space-y-6">
      {!showForm && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="mb-1">Atividades dos Eventos</h2>
              <p className="text-muted-foreground">
                Gerencie palestras, workshops e sessões dos seus eventos
              </p>
            </div>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Atividade
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar atividades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select
                    value={selectedEventFilter}
                    onValueChange={setSelectedEventFilter}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filtrar por evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os eventos</SelectItem>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {(searchTerm || selectedEventFilter !== "all") && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedEventFilter("all")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                Exibindo {filteredCount} de {totalActivities} atividade
                {totalActivities !== 1 ? "s" : ""}
              </div>
            </CardContent>
          </Card>

          {/* Activities List */}
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">
                {searchTerm || selectedEventFilter !== "all"
                  ? "Nenhuma atividade encontrada"
                  : "Nenhuma atividade cadastrada"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedEventFilter !== "all"
                  ? "Tente ajustar seus filtros ou termos de busca."
                  : "Comece criando atividades para seus eventos."}
              </p>
              {!(searchTerm || selectedEventFilter !== "all") && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Atividade
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(activitiesByEvent).map(
                ([eventId, eventActivities]) => {
                  const event = events.find((e) => e.id === eventId)
                  if (!event) return null

                  return (
                    <div key={eventId} className="space-y-4">
                      <div className="flex items-center gap-3 pb-2 border-b">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3>{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {event.location.name} - {event.location.city},{" "}
                            {event.location.state}
                          </p>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                          {eventActivities.length} atividade
                          {eventActivities.length !== 1 ? "s" : ""}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {eventActivities
                          .sort((a, b) => {
                            const dateA = new Date(
                              `${a.startDate}T${a.startTime}`
                            )
                            const dateB = new Date(
                              `${b.startDate}T${b.startTime}`
                            )
                            return dateA.getTime() - dateB.getTime()
                          })
                          .map((activity) => (
                            <ActivityCard
                              key={activity.id}
                              activity={activity}
                              event={event}
                              onEdit={handleEditActivity}
                              onDelete={onDeleteActivity}
                            />
                          ))}
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          )}
        </>
      )}

      {showForm && (
        <div>
          <Button variant="ghost" onClick={handleCancelForm} className="mb-4">
            ← Voltar
          </Button>
          <ActivityForm
            activity={editingActivity || undefined}
            events={events}
            onSubmit={
              editingActivity ? handleUpdateActivity : handleCreateActivity
            }
            onCancel={handleCancelForm}
          />
        </div>
      )}
    </div>
  )
}
