import { Search, Filter, X } from "lucide-react"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { translateCategory, CategoryKey } from "./ui/categoryUtils"

export interface EventFilters {
  search: string
  category:
    | "all"
    | "business"
    | "social"
    | "sports"
    | "education"
    | "entertainment"
    | "musicalShows"
    | "courses"
    | "teather"
    | "technology"
    | "gastronomy"
    | "religious"
    | "kidsAndFamily"
    | "other"
  status: "all" | "active" | "inactive"
  dateRange: "all" | "today" | "this-week" | "this-month" | "next-month"
}

interface EventFiltersProps {
  filters: EventFilters
  onFiltersChange: (filters: EventFilters) => void
  onClearFilters: () => void
}

export function EventFiltersComponent({
  filters,
  onFiltersChange,
  onClearFilters,
}: EventFiltersProps) {
  const updateFilter = (
    key: keyof EventFilters,
    value: EventFilters[keyof EventFilters]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const hasActiveFilters =
    filters.search ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.dateRange !== "all"

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Procurar Eventos..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {/* CATEGORY */}
          <Select
            value={filters.category}
            onValueChange={(value: EventFilters["category"]) =>
              updateFilter("category", value)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Categorias</SelectItem>
              <SelectItem value="business">Negócios</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="sports">Esportes</SelectItem>
              <SelectItem value="education">Educação</SelectItem>
              <SelectItem value="entertainment">Entretenimento</SelectItem>
              <SelectItem value="musicalShows">Shows e Festas</SelectItem>
              <SelectItem value="courses">Cursos e Workshops</SelectItem>
              <SelectItem value="teather">Teatro e Cultura</SelectItem>
              <SelectItem value="technology">Tecnologia e Inovação</SelectItem>
              <SelectItem value="gastronomy">Gastronomia e Bebidas</SelectItem>
              <SelectItem value="religious">
                Religião e Espiritualidade
              </SelectItem>
              <SelectItem value="kidsAndFamily">Infantil e Família</SelectItem>
              <SelectItem value="other">Outros</SelectItem>
            </SelectContent>
          </Select>

          {/* STATUS */}
          <Select
            value={filters.status}
            onValueChange={(value: EventFilters["status"]) =>
              updateFilter("status", value)
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>

          {/* DATE RANGE */}
          <Select
            value={filters.dateRange}
            onValueChange={(value: EventFilters["dateRange"]) =>
              updateFilter("dateRange", value)
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Datas</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="this-week">Esta Semana</SelectItem>
              <SelectItem value="this-month">Este Mês</SelectItem>
              <SelectItem value="next-month">Próximo Mês</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Badges de filtros ativos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: &quot;{filters.search}&quot;
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("search", "")}
              />
            </Badge>
          )}

          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Category: {translateCategory(filters.category as CategoryKey)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("category", "all")}
              />
            </Badge>
          )}

          {filters.status !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("status", "all")}
              />
            </Badge>
          )}

          {filters.dateRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Date: {filters.dateRange.replace("-", " ")}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("dateRange", "all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
