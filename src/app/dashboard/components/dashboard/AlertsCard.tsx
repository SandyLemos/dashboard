import { AlertTriangle, Bell, Info } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Alert, AlertDescription } from "../ui/alert"

interface AlertsCardProps {
  events: Event[]
  onViewEvent: (event: Event) => void
}

export function AlertsCard({ events, onViewEvent }: AlertsCardProps) {
  // Generate alerts based on event data
  const alerts: Array<{
    id: string
    type: "warning" | "info" | "error"
    message: string
    event?: Event
  }> = []

  // Ingressos quase esgotados
  events.forEach((event) => {
    if (event.attendeeLimit && event.registeredAttendees) {
      const remaining = event.attendeeLimit - event.registeredAttendees
      const percentageRemaining = (remaining / event.attendeeLimit) * 100

      if (percentageRemaining <= 20 && percentageRemaining > 0) {
        alerts.push({
          id: `soldout-${event.id}`,
          type: "warning",
          message: `Ingressos quase esgotados: ${event.title} (${remaining} restantes)`,
          event,
        })
      }
    }
  })

  

  // Evento próximo com poucas inscrições
  const today = new Date()
  const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)

  events.forEach((event) => {
    // DATES OU DATE?
    const eventDate = new Date(event.dates[0]?.date)
    if (
      event.status === "active" &&
      eventDate <= threeDaysFromNow &&
      eventDate >= today &&
      event.attendeeLimit &&
      event.registeredAttendees < event.attendeeLimit * 0.3
    ) {
      alerts.push({
        id: `lowattendance-${event.id}`,
        type: "info",
        message: `Evento próximo com poucas inscrições: ${event.title}`,
        event,
      })
    }
  })

  // Eventos em rascunho
  const draftEvents = events.filter((e) => e.status === "draft")
  if (draftEvents.length > 0) {
    alerts.push({
      id: "drafts",
      type: "info",
      message: `Você tem ${draftEvents.length} evento(s) em rascunho aguardando publicação`,
    })
  }

  const alertsToShow = alerts.slice(0, 3)

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getAlertClass = (type: string) => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-900"
      case "error":
        return "border-red-200 bg-red-50 text-red-900"
      default:
        return "border-blue-200 bg-blue-50 text-blue-900"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Alertas</CardTitle>
          {alertsToShow.length > 0 && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Bell className="h-3 w-3 mr-1" />
              {alertsToShow.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {alertsToShow.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Nenhum alerta no momento
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alertsToShow.map((alert) => (
              <Alert
                key={alert.id}
                className={`${getAlertClass(
                  alert.type
                )} cursor-pointer transition-colors hover:shadow-md`}
                onClick={() => alert.event && onViewEvent(alert.event)}
              >
                <div className="flex items-start gap-2">
                  {getIcon(alert.type)}
                  <AlertDescription className="text-sm">
                    {alert.message}
                  </AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
