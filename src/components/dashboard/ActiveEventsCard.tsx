import { Calendar } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { getNextEventDate } from "../../utils/eventUtils"

interface ActiveEventsCardProps {
  events: Event[]
  onViewEvent: (event: Event) => void
}

export function ActiveEventsCard({
  events,
  onViewEvent,
}: ActiveEventsCardProps) {
  const activeEvents = events.filter((e) => e.status === "active")
  const upcomingEvents = activeEvents
    .filter((e) => {
      const nextDate = getNextEventDate(e)
      return nextDate && new Date(nextDate.date) >= new Date()
    })
    .sort((a, b) => {
      const nextDateA = getNextEventDate(a)
      const nextDateB = getNextEventDate(b)
      if (!nextDateA || !nextDateB) return 0
      return (
        new Date(nextDateA.date).getTime() - new Date(nextDateB.date).getTime()
      )
    })
    .slice(0, 3)

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Eventos Ativos</CardTitle>
          <Badge className="bg-green-100 text-green-800">
            <Calendar className="h-3 w-3 mr-1" />
            Ativo
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-4xl font-bold">{activeEvents.length}</div>
          <p className="text-muted-foreground">eventos ativos</p>
        </div>

        {upcomingEvents.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm font-medium mb-3">Próximos eventos:</p>
            {upcomingEvents.map((event) => {
              const nextDate = getNextEventDate(event)
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => onViewEvent(event)}
                >
                  <span className="text-sm truncate flex-1">{event.title}</span>
                  {nextDate && (
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatShortDate(nextDate.date)}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {activeEvents.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum evento ativo no momento
          </p>
        )}
      </CardContent>
    </Card>
  )
}
