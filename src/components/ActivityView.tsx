import { useState } from "react"
import { Activity, ActivityFormData, Event } from "../types/event"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Calendar, Clock, MapPin, User } from "lucide-react"

interface ActivityFormProps {
  activity?: Activity
  events: Event[]
  onSubmit: (activityData: ActivityFormData) => void
  onCancel: () => void
}

export function ActivityForm({
  activity,
  events,
  onSubmit,
  onCancel,
}: ActivityFormProps) {
  const [formData, setFormData] = useState<ActivityFormData>({
    eventId: activity?.eventId || "",
    title: activity?.title || "",
    description: activity?.description || "",
    startDate: activity?.startDate || "",
    startTime: activity?.startTime || "",
    endDate: activity?.endDate || "",
    endTime: activity?.endTime || "",
    maxAttendees: activity?.maxAttendees || undefined,
    location: activity?.location || "",
    speaker: activity?.speaker || "",
  })

  type ActivityFormErrors = Partial<Record<keyof ActivityFormData, string>>

  const [errors, setErrors] = useState<ActivityFormErrors>({})

const validateForm = (): boolean => {
  const newErrors: ActivityFormErrors = {}

  if (!formData.eventId) newErrors.eventId = "Selecione um evento"
  if (!formData.title.trim()) newErrors.title = "Título é obrigatório"
  if (!formData.description.trim())
    newErrors.description = "Descrição é obrigatória"
  if (!formData.startDate) newErrors.startDate = "Data de início é obrigatória"
  if (!formData.startTime)
    newErrors.startTime = "Horário de início é obrigatório"
  if (!formData.endDate) newErrors.endDate = "Data de término é obrigatória"
  if (!formData.endTime) newErrors.endTime = "Horário de término é obrigatório"

  if (
    formData.startDate &&
    formData.endDate &&
    formData.startTime &&
    formData.endTime
  ) {
    const start = new Date(`${formData.startDate}T${formData.startTime}`)
    const end = new Date(`${formData.endDate}T${formData.endTime}`)

    if (end <= start) {
      newErrors.endTime = "Data/hora de término deve ser após o início"
    }
  }

  if (!formData.location.trim()) {
    newErrors.location = "Local é obrigatório"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

const updateField = <K extends keyof ActivityFormData>(
  field: K,
  value: ActivityFormData[K]
) => {
  setFormData((prev) => ({ ...prev, [field]: value }))

  if (errors[field]) {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }
}


  const selectedEvent = events.find((e) => e.id === formData.eventId)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          {activity ? "Editar Atividade" : "Criar Nova Atividade"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="eventId">Evento *</Label>
      <Select
        value={formData.eventId}
        onValueChange={(value: string) => updateField("eventId", value)}
        disabled={!!activity}
      >

              <SelectTrigger
                className={errors.eventId ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventId && (
              <p className="text-sm text-destructive">{errors.eventId}</p>
            )}
            {selectedEvent && (
              <p className="text-sm text-muted-foreground">
                📍 {selectedEvent.location.name} - {selectedEvent.location.city}
                , {selectedEvent.location.state}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título da Atividade *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Ex: Palestra sobre React Hooks"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Descreva o conteúdo e objetivos da atividade"
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data de Início *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className={errors.startDate ? "border-destructive" : ""}
              />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário de Início *
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => updateField("startTime", e.target.value)}
                className={errors.startTime ? "border-destructive" : ""}
              />
              {errors.startTime && (
                <p className="text-sm text-destructive">{errors.startTime}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data de Término *
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
                min={
                  formData.startDate || new Date().toISOString().split("T")[0]
                }
                className={errors.endDate ? "border-destructive" : ""}
              />
              {errors.endDate && (
                <p className="text-sm text-destructive">{errors.endDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário de Término *
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => updateField("endTime", e.target.value)}
                className={errors.endTime ? "border-destructive" : ""}
              />
              {errors.endTime && (
                <p className="text-sm text-destructive">{errors.endTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Local da Atividade *
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Ex: Sala 101 - Auditório Principal"
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="speaker" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Palestrante / Facilitador
              </Label>
              <Input
                id="speaker"
                value={formData.speaker || ""}
                onChange={(e) => updateField("speaker", e.target.value)}
                placeholder="Ex: Dr. João Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAttendees">Número de Vagas</Label>
              <Input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees || ""}
                onChange={(e) =>
                  updateField(
                    "maxAttendees",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                placeholder="Sem limite"
                min="1"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {activity ? "Atualizar Atividade" : "Criar Atividade"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
