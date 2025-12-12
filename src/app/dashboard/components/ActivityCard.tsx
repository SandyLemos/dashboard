import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  User,
} from "lucide-react"
import { Activity, Event } from "../types/event"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface ActivityCardProps {
  activity: Activity
  event: Event
  onEdit: (activity: Activity) => void
  onDelete: (activityId: string) => void
}

export function ActivityCard({
  activity,
  event,
  onEdit,
  onDelete,
}: ActivityCardProps) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  const formatTime = (time: string) =>
    new Date(`2000-01-01T${time}`).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

  const isSameDay = activity.startDate === activity.endDate

  const pct = activity.maxAttendees
    ? Math.round((activity.registeredAttendees / activity.maxAttendees) * 100)
    : 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <h3 className="mb-1 truncate">{activity.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {event.title}
            </p>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(activity)}>
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(activity.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {activity.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(activity.startDate)}
              {!isSameDay && ` - ${formatDate(activity.endDate)}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{activity.location}</span>
          </div>

          {activity.speaker && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span>{activity.speaker}</span>
            </div>
          )}

          {activity.maxAttendees && (
            <div className="pt-2 border-t">
              <div className="flex justify-between mb-2">
                <span className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  {activity.registeredAttendees} / {activity.maxAttendees}{" "}
                  inscritos
                </span>

                <Badge>{pct}%</Badge>
              </div>

              <div className="w-full bg-muted h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
