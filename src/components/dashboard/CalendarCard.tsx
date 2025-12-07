import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { useState } from "react"
import { Badge } from "../ui/badge"

interface CalendarCardProps {
  events: Event[]
  onViewEvent: (event: Event) => void
}

export function CalendarCard({ events, onViewEvent }: CalendarCardProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentMonth)

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`
    return events.filter(
      (e) => e.status === "active" && e.dates.some((d) => d.date === dateStr)
    )
  }

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }

  const monthName = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })

  // Get next 3 events
  const upcomingEvents = events
    .filter((e) => {
      if (e.status !== "active") return false
      return e.dates.some((d) => new Date(d.date) >= new Date())
    })
    .map((e) => {
      const nextDate = e.dates
        .filter((d) => new Date(d.date) >= new Date())
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )[0]
      return { event: e, nextDate }
    })
    .filter((item) => item.nextDate)
    .sort(
      (a, b) =>
        new Date(a.nextDate!.date).getTime() -
        new Date(b.nextDate!.date).getTime()
    )
    .slice(0, 3)

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
          <CardTitle>Calendário</CardTitle>
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium capitalize">{monthName}</span>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
            <div
              key={i}
              className="text-center text-xs text-muted-foreground p-2"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayEvents = getEventsForDay(day)
            const hasEvents = dayEvents.length > 0

            return (
              <div
                key={day}
                className={`
                  relative p-2 text-center text-sm rounded-lg cursor-pointer transition-colors
                  ${
                    hasEvents
                      ? "bg-purple-100 hover:bg-purple-200 font-medium"
                      : "hover:bg-muted"
                  }
                `}
                title={hasEvents ? `${dayEvents.length} evento(s)` : ""}
              >
                {day}
                {hasEvents && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-purple-600 rounded-full" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Lista de Próximos eventos, uso de etiqueta para categorias */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-3">Próximos eventos:</p>
          <div className="space-y-2">
            {upcomingEvents.map((item) => {
              const event = item.event
              const nextDate = item.nextDate!
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => onViewEvent(event)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {" "}
                      {/* NOVO WRAPPER */}
                      <p className="text-sm font-medium truncate">
                        {event.title}
                      </p>
                      <Badge
                        variant="secondary"
                        className="px-1.5 py-0 text-xs h-5 whitespace-nowrap"
                      >
                        {" "}
                        {/* NOVO BADGE */}
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatShortDate(nextDate.date)} •{" "}
                      {formatTime(nextDate.startTime)}
                    </p>
                  </div>
                </div>
              )
            })}
            {upcomingEvents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2">
                Nenhum evento próximo
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
