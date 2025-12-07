import { useState } from "react"
import { Event, EventFormData, EventDate, Location } from "../types/event"
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
import { Switch } from "./ui/switch"
import { Plus, Trash2, Calendar } from "lucide-react" 

// TIPAGEM
type ErrorMap = Record<string, string | undefined>

interface EventFormProps {
  event?: Event
  onSubmit: (eventData: EventFormData) => void
  onCancel: () => void 
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || "",
    description: event?.description || "",
    dates: event?.dates || [
      {
        id: crypto.randomUUID(),
        date: "",
        startTime: "",
        endTime: "",
      },
    ],
    location: event?.location || {
      name: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    category: event?.category || "other",
    attendeeLimit: event?.attendeeLimit || undefined,
    ticketPrice: event?.ticketPrice || undefined,
    acceptingRegistrations: event?.acceptingRegistrations ?? true,
  })

  const [errors, setErrors] = useState<ErrorMap>({})

  const validateForm = (): boolean => {
    const newErrors: ErrorMap = {}

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    }

    if (formData.dates.length === 0) {
      newErrors.dates = "Adicione pelo menos uma data"
    } else {
      formData.dates.forEach((dateItem, index) => {
        if (!dateItem.date) newErrors[`date-${index}`] = "Data é obrigatória"
        if (!dateItem.startTime)
          newErrors[`startTime-${index}`] = "Horário de início é obrigatório"
        if (!dateItem.endTime)
          newErrors[`endTime-${index}`] = "Horário de término é obrigatório"

        if (
          dateItem.startTime &&
          dateItem.endTime &&
          dateItem.startTime >= dateItem.endTime
        ) {
          newErrors[`endTime-${index}`] =
            "Horário de término deve ser após o início"
        }
      })
    }

    if (!formData.location.name.trim()) {
      newErrors.locationName = "Nome do local é obrigatório"
    }
    if (!formData.location.city.trim()) {
      newErrors.locationCity = "Cidade é obrigatória"
    }
    if (!formData.location.state.trim()) {
      newErrors.locationState = "Estado é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const updateField = <K extends keyof EventFormData>(
    field: K,
    value: EventFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // 'addDate' é usado
  const addDate = () => {
    const newDate: EventDate = {
      id: crypto.randomUUID(),
      date: "",
      startTime: "",
      endTime: "",
    }
    setFormData((prev) => ({
      ...prev,
      dates: [...prev.dates, newDate],
    }))
  }

  // 'removeDate' é usado
  const removeDate = (dateId: string) => {
    if (formData.dates.length > 1) {
      setFormData((prev) => ({
        ...prev,
        dates: prev.dates.filter((d) => d.id !== dateId),
      }))
      // Limpa erro de datas se removemos um item
      if (errors.dates) {
        setErrors((prev) => ({ ...prev, dates: undefined }))
      }
    }
  }

  // 'updateDate' é usado
  const updateDate = (
    dateId: string,
    field: keyof EventDate,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      dates: prev.dates.map((d) =>
        d.id === dateId ? { ...d, [field]: value } : d
      ),
    }))

    const index = formData.dates.findIndex((d) => d.id === dateId)
    setErrors((prev) => ({
      ...prev,
      [`${field}-${index}`]: undefined,
    }))
  }

  // 'updateLocationField' é usado
  const updateLocationField = (field: keyof Location, value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }))

    const errorKey = `location${field.charAt(0).toUpperCase()}${field.slice(1)}`
    setErrors((prev) => ({ ...prev, [errorKey]: undefined }))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{event ? "Editar Evento" : "Criar Novo Evento"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div className="space-y-2">
            <Label htmlFor="title">Título do Evento</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Digite o título do evento"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Descreva seu evento"
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* CATEGORY + LIMIT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CATEGORY */}
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value: Event["category"]) =>
                  updateField("category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Negócios</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="sports">Esportes e Bem-estar</SelectItem>
                  <SelectItem value="education">Educação</SelectItem>
                  <SelectItem value="entertainment">Entretenimento</SelectItem>
                  <SelectItem value="musicalShows">Shows e Festas</SelectItem>
                  <SelectItem value="courses">Cursos e Workshops</SelectItem>
                  <SelectItem value="teather">Teatro e Cultura</SelectItem>
                  <SelectItem value="technology">Tecnologia e Inovação</SelectItem>
                  <SelectItem value="gastronomy">Gastronomia e Bebidas</SelectItem>
                  <SelectItem value="religious">Religião e Espiritualidade</SelectItem>
                  <SelectItem value="kidsAndFamily">Infantil e Família</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* LIMIT */}
            <div className="space-y-2">
              <Label htmlFor="attendeeLimit">Limite de Participantes</Label>
              <Input
                id="attendeeLimit"
                type="number"
                value={formData.attendeeLimit ?? ""}
                onChange={(e) =>
                  updateField(
                    "attendeeLimit",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder="Sem limite"
                min={1}
              />
            </div>
          </div>

          <hr />

          {/* 📅 SECTION: DATES */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Datas e Horários
            </h3>
            {formData.dates.map((dateItem, index) => (
              <div
                key={dateItem.id}
                className="grid grid-cols-1 md:grid-cols-7 gap-3 items-end border p-4 rounded-md relative"
              >
                {/* DATE */}
                <div className="col-span-1 md:col-span-3 space-y-2">
                  <Label htmlFor={`date-${dateItem.id}`}>Data</Label>
                  <Input
                    id={`date-${dateItem.id}`}
                    type="date"
                    value={dateItem.date}
                    onChange={(e) =>
                      updateDate(dateItem.id, "date", e.target.value)
                    }
                    className={
                      errors[`date-${index}`] ? "border-destructive" : ""
                    }
                  />
                  {errors[`date-${index}`] && (
                    <p className="text-sm text-destructive absolute top-full mt-1">
                      {errors[`date-${index}`]}
                    </p>
                  )}
                </div>

                {/* START TIME */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor={`startTime-${dateItem.id}`}>Início</Label>
                  <Input
                    id={`startTime-${dateItem.id}`}
                    type="time"
                    value={dateItem.startTime}
                    onChange={(e) =>
                      updateDate(dateItem.id, "startTime", e.target.value)
                    }
                    className={
                      errors[`startTime-${index}`] ? "border-destructive" : ""
                    }
                  />
                  {errors[`startTime-${index}`] && (
                    <p className="text-sm text-destructive absolute top-full mt-1">
                      {errors[`startTime-${index}`]}
                    </p>
                  )}
                </div>

                {/* END TIME */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor={`endTime-${dateItem.id}`}>Término</Label>
                  <Input
                    id={`endTime-${dateItem.id}`}
                    type="time"
                    value={dateItem.endTime}
                    onChange={(e) =>
                      updateDate(dateItem.id, "endTime", e.target.value)
                    }
                    className={
                      errors[`endTime-${index}`] ? "border-destructive" : ""
                    }
                  />
                  {errors[`endTime-${index}`] && (
                    <p className="text-sm text-destructive absolute top-full mt-1">
                      {errors[`endTime-${index}`]}
                    </p>
                  )}
                </div>

                {/* REMOVE BUTTON */}
                {formData.dates.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDate(dateItem.id)} // 'removeDate' é usado
                    className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" /> {/* 'Trash2' é usado */}
                  </Button>
                )}
              </div>
            ))}

            {errors.dates && (
              <p className="text-sm text-destructive mt-2">{errors.dates}</p>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={addDate} // 'addDate' é usado
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> {/* 'Plus' é usado */}
              Adicionar outra data
            </Button>
          </section>

          <hr />

          {/* 📍 SECTION: LOCATION */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Localização</h3>

            {/* LOCATION NAME */}
            <div className="space-y-2">
              <Label htmlFor="locationName">Nome do Local *</Label>
              <Input
                id="locationName"
                value={formData.location.name}
                onChange={(e) => updateLocationField("name", e.target.value)} // 'updateLocationField' é usado
                placeholder="Ex: Centro de Convenções"
                className={errors.locationName ? "border-destructive" : ""}
              />
              {errors.locationName && (
                <p className="text-sm text-destructive">
                  {errors.locationName}
                </p>
              )}
            </div>

            {/* STREET and NEIGHBORHOOD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Rua / Endereço </Label>
                <Input
                  id="street"
                  value={formData.location.street}
                  onChange={(e) =>
                    updateLocationField("street", e.target.value)
                  }
                  placeholder="Rua Exemplo, 123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  value={formData.location.neighborhood}
                  onChange={(e) =>
                    updateLocationField("neighborhood", e.target.value)
                  }
                  placeholder="Seu Bairro"
                />
              </div>
            </div>

            {/* CITY, STATE, ZIPCODE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.location.city}
                  onChange={(e) => updateLocationField("city", e.target.value)}
                  placeholder="Sua Cidade"
                  className={errors.locationCity ? "border-destructive" : ""}
                />
                {errors.locationCity && (
                  <p className="text-sm text-destructive">
                    {errors.locationCity}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado * (UF)</Label>
                <Input
                  id="state"
                  value={formData.location.state}
                  onChange={(e) => updateLocationField("state", e.target.value)}
                  placeholder="UF"
                  maxLength={2}
                  className={errors.locationState ? "border-destructive" : ""}
                />
                {errors.locationState && (
                  <p className="text-sm text-destructive">
                    {errors.locationState}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP </Label>
                <Input
                  id="zipCode"
                  value={formData.location.zipCode}
                  onChange={(e) =>
                    updateLocationField("zipCode", e.target.value)
                  }
                  placeholder="00000-000"
                />
              </div>
            </div>
          </section>

          <hr />

          {/* 💲 SECTION: TICKET PRICE AND REGISTRATION */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Detalhes Adicionais</h3>

            {/* PREÇO TICKET */}
            <div className="space-y-2 max-w-sm">
              <Label htmlFor="ticketPrice">Preço do Ingresso (R$)</Label>
              <Input
                id="ticketPrice"
                type="number"
                step="0.01"
                value={formData.ticketPrice ?? ""}
                onChange={(e) =>
                  updateField(
                    "ticketPrice",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder="0.00 (Deixe vazio para evento gratuito)"
                min={0}
              />
            </div>

            {/* ACCEPTING REGISTRATIONS SWITCH */}
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <Label htmlFor="acceptingRegistrations" className="font-medium">
                  Aceitar Inscrições
                </Label>
                <p className="text-sm text-muted-foreground">
                  Se desativado, o evento não aparecerá para registro público.
                </p>
              </div>
              <Switch
                id="acceptingRegistrations" // 'Switch' é usado
                checked={formData.acceptingRegistrations}
                onCheckedChange={(checked) =>
                  updateField("acceptingRegistrations", checked)
                }
              />
            </div>
          </section>

          <hr />

          {/* ACTIONS BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel} // 'onCancel' é usado
            >
              Cancelar
            </Button>
            <Button type="submit" className="min-w-[120px]">
              {" "}
              {/* 'Button' é usado */}
              {event ? "Salvar Alterações" : "Criar Evento"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
