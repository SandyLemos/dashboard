import { Plus, Download, CheckCircle, Edit } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

interface QuickActionsCardProps {
  events: Event[]
  onCreateEvent: () => void
  onEditEvent: (event: Event) => void
  onExportAttendees: () => void
}

export function QuickActionsCard({
  events,
  onCreateEvent,
  onEditEvent,
  onExportAttendees,
}: QuickActionsCardProps) {
  // Get inactive events
  const inactiveEvents = events.filter((e) => e.status === "inactive")

  // Get events with low attendance (less than 30% capacity)
  const eventsNeedingAttention = events
    .filter(
      (e) =>
        e.status === "active" &&
        e.attendeeLimit &&
        (e.registeredAttendees || 0) < (e.attendeeLimit || 0) * 0.3
    )
    .slice(0, 2)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle>Tarefas / Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Task List */}
        <div className="space-y-3">
          {inactiveEvents.length > 0 && (
            <div
              className="flex items-start gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
              onClick={() => onEditEvent(inactiveEvents[0])}
            >
              <Checkbox id={`inactive-${inactiveEvents[0].id}`} />
              <label
                htmlFor={`inactive-${inactiveEvents[0].id}`}
                className="flex-1 text-sm cursor-pointer"
              >
                Ativar evento:{" "}
                <span className="font-medium">{inactiveEvents[0].title}</span>
              </label>
              {/* EDIT USADO AQUI */}
              <Edit className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
          )}

          {eventsNeedingAttention.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
              onClick={() => onEditEvent(event)}
            >
              <Checkbox id={`task-${event.id}`} />
              <label
                htmlFor={`task-${event.id}`}
                className="flex-1 text-sm cursor-pointer"
              >
                Promover evento:{" "}
                <span className="font-medium">{event.title}</span>
              </label>
              {/* EDIT USADO AQUI */}
              <Edit className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
          ))}

          {inactiveEvents.length === 0 &&
            eventsNeedingAttention.length === 0 && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-700">Tudo em dia!</p>
              </div>
            )}
        </div>

        {/* Quick Action Buttons */}
        <div className="space-y-2 pt-4 border-t">
          <Button
            onClick={onCreateEvent}
            className="w-full gap-2"
            variant="default"
          >
            <Plus className="h-4 w-4" />
            Novo evento
          </Button>

          <Button
            onClick={onExportAttendees}
            className="w-full gap-2"
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Exportar inscritos (CSV)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
