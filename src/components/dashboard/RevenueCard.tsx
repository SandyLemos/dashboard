import { DollarSign, TrendingUp, FileText } from "lucide-react"
import { Event } from "../../types/event"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

interface RevenueCardProps {
  events: Event[]
}

export function RevenueCard({ events }: RevenueCardProps) {
  // Calculate total revenue (mock calculation)
  const totalRevenue = events.reduce((sum, event) => {
    const tickets = event.ticketsSold || event.registeredAttendees || 0
    const price = event.ticketPrice || 50 // Default price if not set
    return sum + tickets * price
  }, 0)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Receita</CardTitle>
          <DollarSign className="h-5 w-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-4xl font-bold text-green-600">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-muted-foreground">faturamento (mês)</p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            <span className="text-green-600">+12%</span> vs semana passada
          </span>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          Ver relatório completo
        </Button>
      </CardContent>
    </Card>
  )
}
