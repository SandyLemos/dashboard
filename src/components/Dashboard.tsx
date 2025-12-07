import { Event } from "../types/event"
import { ActiveEventsCard } from "./dashboard/ActiveEventsCard"
import { NextEventCard } from "./dashboard/NextEventCard"
import { TicketsSoldCard } from "./dashboard/TicketsSoldCard"
import { RevenueCard } from "./dashboard/RevenueCard"
import { QuickActionsCard } from "./dashboard/QuickActionsCard"
import { AlertsCard } from "./dashboard/AlertsCard"
import { CalendarCard } from "./dashboard/CalendarCard"
import { TopEventsCard } from "./dashboard/TopEventsCard"

interface DashboardProps {
  events: Event[]
  onCreateEvent: () => void
  onEditEvent: (event: Event) => void
  onViewEvent: (event: Event) => void
  onViewAttendees: (event: Event) => void
  onExportAttendees: () => void
}

export function Dashboard({
  events,
  onCreateEvent,
  onEditEvent,
  onViewEvent,
  onViewAttendees,
  onExportAttendees,
}: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Dashboard do Organizador</h1>
        <p className="text-muted-foreground">
          Visão geral dos seus eventos e métricas principais
        </p>
      </div>

      {/* Top Row - Most Important Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActiveEventsCard events={events} onViewEvent={onViewEvent} />
        <NextEventCard
          events={events}
          onViewDetails={onViewEvent}
          onManageAttendees={onViewAttendees}
        />
        <TicketsSoldCard events={events} />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RevenueCard events={events} />
        <QuickActionsCard
          events={events}
          onCreateEvent={onCreateEvent}
          onEditEvent={onEditEvent}
          onExportAttendees={onExportAttendees}
        />
        <AlertsCard events={events} onViewEvent={onViewEvent} />
      </div>

      {/* Bottom Row - Optional Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarCard events={events} onViewEvent={onViewEvent} />
        <TopEventsCard events={events} onViewEvent={onViewEvent} />
      </div>
    </div>
  )
}
