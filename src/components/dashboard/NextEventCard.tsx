import Image from "next/image" // <-- NOVA IMPORTAÇÃO
import { Calendar, MapPin, Clock, Eye, Users } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { getNextEventDate } from "../../utils/eventUtils"

interface NextEventCardProps {
  events: Event[]
  onViewDetails: (event: Event) => void
  onManageAttendees: (event: Event) => void
}

export function NextEventCard({
  events,
  onViewDetails,
  onManageAttendees,
}: NextEventCardProps) {
  const upcomingEvents = events
    .filter((e) => {
      if (e.status !== "active") return false
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

  const nextEvent = upcomingEvents[0]
  const nextDate = nextEvent ? getNextEventDate(nextEvent) : null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!nextEvent || !nextDate) {
    return (
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Próximo Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Nenhum evento próximo agendado
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="md:col-span-2 lg:col-span-1 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Próximo Evento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Image */}
        {nextEvent.imageUrl && (
          <div className="relative aspect-[4/1] rounded-lg overflow-hidden">
            <Image
              src={nextEvent.imageUrl}
              alt={nextEvent.title}
              // Usamos `fill` e `object-cover` para garantir que a imagem preencha o contêiner
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw" // Boa prática para otimização responsiva
            />
          </div>
        )}
        {!nextEvent.imageUrl && (
          <div className="aspect-[4/1] bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Calendar className="h-8 w-8 text-white opacity-80" />
          </div>
        )}

        {/* Detalhes de evento */}
        <div>
          <h3 className="mb-1">{nextEvent.title}</h3>
          {/* USANDO MAPPIN AQUI */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground line-clamp-2">
            <MapPin className="h-4 w-4" />
            <p>
              {nextEvent.location.name} - {nextEvent.location.city},{" "}
              {nextEvent.location.state}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(nextDate.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatTime(nextDate.startTime)}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onViewDetails(nextEvent)}
            variant="default"
            size="sm"
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver detalhes
          </Button>
          <Button
            onClick={() => onManageAttendees(nextEvent)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-1" />
            Gerenciar inscrições
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
