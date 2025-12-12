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
  onSubmit: (activity: ActivityFormData) => void
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
    maxAttendees: activity?.maxAttendees,
    location: activity?.location || "",
    speaker: activity?.speaker || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (
    field: keyof ActivityFormData,
    value: string | number | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>
          {activity ? "Editar Atividade" : "Criar Atividade"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EVENTO */}
          <div className="space-y-2">
            <Label>Evento *</Label>
            <Select
              value={formData.eventId}
              onValueChange={(value: string) => updateField("eventId", value)}
              disabled={!!activity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {events.map((ev) => (
                  <SelectItem key={ev.id} value={ev.id}>
                    {ev.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TÍTULO */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          {/* DESCRIÇÃO */}
          <div className="space-y-2">
            <Label>Descrição *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          {/* DATAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início *</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Horário de Início *</Label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => updateField("startTime", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Término *</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Horário de Término *</Label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => updateField("endTime", e.target.value)}
              />
            </div>
          </div>

          {/* LOCAL */}
          <div className="space-y-2">
            <Label>Local *</Label>
            <Input
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>

          {/* PALESTRANTE E VAGAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Palestrante</Label>
              <Input
                value={formData.speaker}
                onChange={(e) => updateField("speaker", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Número de vagas</Label>
              <Input
                type="number"
                value={formData.maxAttendees ?? ""}
                onChange={(e) =>
                  updateField(
                    "maxAttendees",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {activity ? "Atualizar" : "Criar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
