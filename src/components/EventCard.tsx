import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"
import { Event } from "../types/event"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { getNextEventDate } from "../utils/eventUtils"

interface EventCardProps {
  event: Event
  onEdit: (event: Event) => void
  onDelete: (eventId: string) => void
  onView: (event: Event) => void
}

const translateCategory = (category: Event["category"]): string => {
  switch (category) {
    case "business":
      return "Negócios"
    case "social":
      return "Social"
    case "sports":
      return "Esportes e Bem-estar" // Novo nome completo
    case "education":
      return "Educação"
    case "entertainment":
      return "Entretenimento"
    
    // NOVAS CATEGORIAS
    case "musicalShows":
      return "Shows e Festas"
    case "courses":
      return "Cursos e Workshops"
    case "teather":
      return "Teatro e Cultura"
    case "technology":
      return "Tecnologia e Inovação"
    case "gastronomy":
      return "Gastronomia e Bebidas"
    case "religious":
      return "Religião e Espiritualidade"
    case "kidsAndFamily":
      return "Infantil e Família"
      
    case "other":
      return "Outro"
    default:
      return "Outro"
  }
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

// Tipagem corrigida para statusColors
const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-destructive",
}

type StatusKey = keyof typeof statusColors

export function EventCard({ event, onEdit, onDelete, onView }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    // Note: O mês 'short' em pt-BR é melhor formatado em minúsculas (ex: dez.)
    const date = new Date(`2000-01-01T${timeString}`)
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    // Remoção de segundos ou AM/PM se houver
    return formattedTime.replace(/:\d{2}\s?(AM|PM)?/i, "")
  }

  const nextDate = getNextEventDate(event)
  const hasMultipleDates = event.dates.length > 1

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 flex-wrap">
            {/* 2. APLICAÇÃO DA TRADUÇÃO AQUI */}
            <Badge className={categoryColors[event.category]}>
              {translateCategory(event.category)}
            </Badge>
            {/* Tipagem corrigida: Usando as cores e o nome do status */}
            <Badge className={statusColors[event.status as StatusKey]}>
              {event.status === "active" ? "Ativo" : "Inativo"}
            </Badge>
            {!event.acceptingRegistrations && (
              <Badge variant="outline">Inscrições fechadas</Badge>
            )}
            {hasMultipleDates && (
              <Badge variant="secondary">{event.dates.length} datas</Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                onEdit(event)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                onDelete(event.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h3
          className="mt-2 font-semibold text-lg cursor-pointer"
          onClick={() => onView(event)}
        >
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          {" "}
          {/* Adicionado text-sm para consistência */}
          {nextDate && (
            <>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {formatDate(nextDate.date)}
                  {hasMultipleDates && (
                    <span className="text-muted-foreground/70 ml-1 italic">
                      (próxima)
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {formatTime(nextDate.startTime)} -{" "}
                  {formatTime(nextDate.endTime)}
                </span>
              </div>
            </>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {event.location.name} - {event.location.city},{" "}
              {event.location.state}
            </span>
          </div>
          {event.attendeeLimit && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                <span className="text-foreground font-semibold">
                  {event.registeredAttendees}
                </span>
                /{event.attendeeLimit} participantes
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
