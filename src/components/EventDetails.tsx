import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Edit,
  Trash2,
  X,
} from "lucide-react"
import { Event } from "../types/event"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { translateCategory, CategoryKey } from "./ui/categoryUtils"

interface EventDetailsProps {
  event: Event
  onEdit: (event: Event) => void
  onDelete: (eventId: string) => void
  onClose: () => void
}

const categoryColors = {
  business: "bg-blue-100 text-blue-800",
  social: "bg-yellow-100 text-yellow-800",
  sports: "bg-orange-100 text-orange-800",
  education: "bg-purple-100 text-purple-800",
  entertainment: "bg-pink-100 text-pink-800",
  musicalShows: "bg-purple-900/10 text-purple-900",
  courses: "bg-orange-100 text-orange-800",
  teather: "bg-rose-100 text-pink-400",
  technology: "bg-blue-900/10 text-blue-600",
  gastronomy: "bg-lime-100 text-lime-800",
  religious: "bg-amber-100 text-amber-800",
  kidsAndFamily: "bg-fuchsia-800/10 text-fuchsia-800",
  other: "bg-cyan-100 text-cyan-800",
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
}

export function EventDetails({
  event,
  onEdit,
  onDelete,
  onClose,
}: EventDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex-1">
            <div className="flex gap-2 mb-3">
              <Badge className={categoryColors[event.category as CategoryKey]}>
                <Tag className="h-3 w-3 mr-1" />
                {translateCategory(event.category as CategoryKey)}
              </Badge>
              <Badge
                className={
                  statusColors[event.status as keyof typeof statusColors]
                }
              >
                {event.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{event.title}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium">Datas do Evento</p>
                {event.dates.map((dateItem) => (
                  <p key={dateItem.id} className="text-muted-foreground">
                    {formatDate(dateItem.date)} •{" "}
                    {formatTime(dateItem.startTime)} -{" "}
                    {formatTime(dateItem.endTime)}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium">Local</p>
                <p className="text-muted-foreground">{event.location.name}</p>
                {event.location.street && (
                  <p className="text-sm text-muted-foreground">
                    {event.location.street}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {[
                    event.location.neighborhood,
                    event.location.city,
                    event.location.state,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {event.location.zipCode && (
                  <p className="text-sm text-muted-foreground">
                    CEP: {event.location.zipCode}
                  </p>
                )}
              </div>
            </div>

            {event.attendeeLimit && (
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Participantes</p>
                  <p className="text-muted-foreground">
                    {event.registeredAttendees} de {event.attendeeLimit}{" "}
                    inscritos
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (event.registeredAttendees / event.attendeeLimit) *
                            100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {event.ticketPrice && (
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Valor do Ingresso</p>
                  <p className="text-muted-foreground">
                    R$ {event.ticketPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Criado em: {formatDateTime(event.createdAt)}</p>
              <p>Última atualização: {formatDateTime(event.updatedAt)}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => onEdit(event)} className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Editar Evento
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(event.id)}
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir Evento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
