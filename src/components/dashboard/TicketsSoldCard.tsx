import { Ticket, TrendingUp } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

interface TicketsSoldCardProps {
  events: Event[]
}

export function TicketsSoldCard({ events }: TicketsSoldCardProps) {
  // Calculate total tickets sold
  const totalTickets = events.reduce((sum, event) => {
    return sum + (event.ticketsSold || event.registeredAttendees || 0)
  }, 0)

  // Get top 3 events by tickets sold
  const topEventsBySales = [...events]
    .filter((e) => (e.ticketsSold || e.registeredAttendees || 0) > 0)
    .sort((a, b) => {
      const aSales = a.ticketsSold || a.registeredAttendees || 0
      const bSales = b.ticketsSold || b.registeredAttendees || 0
      return bSales - aSales
    })
    .slice(0, 3)

  // Simple sparkline data (last 7 days mock data)
  const sparklineData = [15, 23, 18, 30, 25, 35, 28]
  const maxValue = Math.max(...sparklineData)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Ingressos Vendidos</CardTitle>
          <Ticket className="h-5 w-5 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-4xl font-bold text-purple-600">
            {totalTickets}
          </div>
          <p className="text-muted-foreground">vendidos (últimos 7 dias)</p>
        </div>

        {/* Mini Sparkline */}
        <div className="mb-4 pb-4 border-b">
          <div className="flex items-end gap-1 h-12">
            {sparklineData.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-purple-200 rounded-t"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-green-600">+15%</span> vs semana passada
          </p>
        </div>

        {/* Breakdown by event */}
        {topEventsBySales.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Por evento:</p>
            {topEventsBySales.map((event) => {
              const tickets =
                event.ticketsSold || event.registeredAttendees || 0
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm truncate flex-1">{event.title}</span>
                  <Badge variant="secondary" className="ml-2">
                    {tickets}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
