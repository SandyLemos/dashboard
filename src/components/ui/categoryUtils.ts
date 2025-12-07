export const categoryColors = {
  business: "bg-blue-100 text-blue-800",
  social: "bg-green-100 text-green-800",
  sports: "bg-orange-100 text-orange-800",
  education: "bg-purple-100 text-purple-800",
  entertainment: "bg-pink-100 text-pink-800",
  musicalShows: "bg-red-100 text-red-800",
  courses: "bg-yellow-100 text-yellow-800",
  teather: "bg-lime-100 text-lime-800",
  technology: "bg-cyan-100 text-cyan-800",
  gastronomy: "bg-amber-100 text-amber-800",
  religious: "bg-indigo-100 text-indigo-800",
  kidsAndFamily: "bg-fuchsia-100 text-fuchsia-800",
  other: "bg-gray-100 text-gray-800",
} as const

// 1. Definição do tipo Category Keys (chaves em inglês)
export type CategoryKey =
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

// 2. A função de tradução usa o novo tipo
// Ela aceita a chave ou uma string vazia (usada em filtros para "Todas as Categorias")
export const translateCategory = (category: CategoryKey | string): string => {
  switch (category) {
    case "business":
      return "Negócios"
    case "social":
      return "Social"
    case "sports":
      return "Esportes e Bem-estar"
    case "education":
      return "Educação"
    case "entertainment":
      return "Entretenimento"

    // Novas Categorias
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

    case "": // Para a opção de filtro "Todas as Categorias"
      return "Todas as Categorias"

    default:
      // Fallback para caso a chave seja desconhecida
      return "Categoria Desconhecida"
  }
}
