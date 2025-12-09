// Simulação de busca de evento por slug (parâmetro de rota)
const mockEventDetail = {
  slug: "raphael-ghanem-standup",
  title: "RAPHAEL GHANEM - SE É QUE VOCÊ ME ENTENDE!",
  dateRange: "27 a 29 de Novembro",
  time: "Quinta e Sexta às 22h00, Sábado às 21h00",
  location: "Befly Minascentro - Belo Horizonte - MG",
  organizerLink: "#", // Link real do organizador
  category: "Stand Up Comedy",
  imageSrc: "/img/poster-raphael.jpg",
  price: "80,00",
  description: [
    'Com texto, interpretação e direção de Raphael Ghanem, "Se é que você me entende" é um espetáculo de Stand up Comedy, repleto de interações e improvisações, feito com texto 100% autoral e sem auxílio de figurinos, perucas e adereços.',
    "O show que tem a duração de 1h20 min, conta com as histórias de vida do artista, além de suas análises de relacionamento, causos rotineiros, e uma perspectiva um tanto quanto exagerada do cotidiano.",
  ],
  schedule: [
    {
      day: "27",
      month: "NOV",
      title: "Quinta-feira",
      timeDetail: "22:00 (Abertura: 21:00)",
    },
    {
      day: "28",
      month: "NOV",
      title: "Sexta-feira",
      timeDetail: "22:00 (Abertura: 21:00)",
    },
    // Adicionar o terceiro item se fosse necessário (no HTML original só tinha 2)
  ],
}

// Função de "busca"
function getEventBySlug(slug: string) {
  if (slug === mockEventDetail.slug) {
    return mockEventDetail
  }
  return mockEventDetail
}

export default function EventDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = getEventBySlug(params.slug)
  if (!event) return <div>Evento não encontrado</div>

  return (
    <div className="event-detail-wrapper">
      {/* ... restante da sua estrutura de cabeçalho ... */}

      <main className="detail-container">
        {/* Usando os dados do objeto 'event' */}
        <h1 className="event-title">{event.title}</h1>
        <p className="event-category">{event.category}</p>

        {/* ... restante do corpo da página (imagem, descrição, etc.) ... */}
      </main>
    </div>
  )
}