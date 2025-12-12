import { Trophy, TrendingUp } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"

interface TopEventsCardProps {
  events: Event[]
  onViewEvent: (event: Event) => void
}

export function TopEventsCard({ events, onViewEvent }: TopEventsCardProps) {
  // Rank events by ticket sales / registrations
  const rankedEvents = [...events]
    .filter(
      (e) =>
        e.status === "active" &&
        (e.ticketsSold || e.registeredAttendees || 0) > 0
    )
    .sort((a, b) => {
      const aSales = a.ticketsSold || a.registeredAttendees || 0
      const bSales = b.ticketsSold || b.registeredAttendees || 0
      return bSales - aSales
    })
    .slice(0, 3)

  const medals = ["🥇", "🥈", "🥉"]
  const rankColors = [
    "bg-yellow-100 text-yellow-800",
    "bg-gray-100 text-gray-800",
    "bg-orange-100 text-orange-800",
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Top Eventos</CardTitle>
          <Trophy className="h-5 w-5 text-yellow-600" />
        </div>
      </CardHeader>
      <CardContent>
        {rankedEvents.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Ainda não há eventos com vendas
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Eventos mais populares por vendas
            </p>

            {rankedEvents.map((event, index) => {
              const sales = event.ticketsSold || event.registeredAttendees || 0
              const capacity = event.attendeeLimit || sales
              const percentage = capacity > 0 ? (sales / capacity) * 100 : 0

              return (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border bg-card hover:shadow-md cursor-pointer transition-all"
                  onClick={() => onViewEvent(event)}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{medals[index]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="truncate">{event.title}</h4>
                        <Badge className={rankColors[index]}>
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{sales} vendidos</span>
                        {event.attendeeLimit && (
                          <span>/ {event.attendeeLimit} vagas</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {event.attendeeLimit && (
                    <div className="space-y-1">
                      <Progress value={percentage} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(0)}% ocupado</span>
                        {percentage >= 80 && (
                          <span className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            Alta demanda
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
