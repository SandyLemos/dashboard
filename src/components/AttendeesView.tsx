import { useState } from "react"
import { Attendee, Event } from "../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  Download,
  Search,
  Users,
  Mail,
  Ticket,
  DollarSign,
  Filter,
  X,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface AttendeesViewProps {
  event: Event
  attendees: Attendee[]
}

export function AttendeesView({ event, attendees }: AttendeesViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "paid" | "pending" | "cancelled"
  >("all")

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPayment =
      paymentFilter === "all" || attendee.paymentStatus === paymentFilter

    return matchesSearch && matchesPayment
  })

  const stats = {
    total: attendees.length,
    paid: attendees.filter((a) => a.paymentStatus === "paid").length,
    pending: attendees.filter((a) => a.paymentStatus === "pending").length,
    revenue: attendees
      .filter((a) => a.paymentStatus === "paid")
      .reduce((sum, a) => sum + a.ticketPrice, 0),
  }

  const handleExportCSV = () => {
    const headers = [
      "Nome Completo",
      "E-mail",
      "Tipo de Ingresso",
      "Valor",
      "Status de Pagamento",
      "Data da Compra",
    ]
    const rows = filteredAttendees.map((attendee) => [
      attendee.fullName,
      attendee.email,
      attendee.ticketType,
      `R$ ${attendee.ticketPrice.toFixed(2)}`,
      attendee.paymentStatus === "paid"
        ? "Pago"
        : attendee.paymentStatus === "pending"
        ? "Pendente"
        : "Cancelado",
      new Date(attendee.purchaseDate).toLocaleDateString("pt-BR"),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `participantes-${event.title.replace(/\s+/g, "-").toLowerCase()}.csv`
    )
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentStatusBadge = (status: Attendee["paymentStatus"]) => {
    const styles = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    }

    const labels = {
      paid: "Pago",
      pending: "Pendente",
      cancelled: "Cancelado",
    }

    return <Badge className={styles[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div>
        <h2 className="mb-4">Participantes - {event.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total de Inscritos
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.total}
                    {event.attendeeLimit && (
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        / {event.attendeeLimit}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Ticket className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pagamentos Confirmados
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.paid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Mail className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pagamentos Pendentes
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Receita Confirmada
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats.revenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Lista de Participantes</CardTitle>
            <Button onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={paymentFilter}
                onValueChange={(
                  value: "all" | "paid" | "pending" | "cancelled"
                ) => setPaymentFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status de Pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="paid">Pagos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>

              {(searchTerm || paymentFilter !== "all") && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearchTerm("")
                    setPaymentFilter("all")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Exibindo {filteredAttendees.length} de {attendees.length}{" "}
            participantes
          </div>

          {/* Attendees Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome Completo</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Tipo de Ingresso</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data da Compra</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {searchTerm || paymentFilter !== "all"
                        ? "Nenhum participante encontrado com os filtros aplicados."
                        : "Nenhum participante inscrito ainda."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {attendee.fullName}
                      </TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>{attendee.ticketType}</TableCell>
                      <TableCell>
                        {formatCurrency(attendee.ticketPrice)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(attendee.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(attendee.purchaseDate)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
