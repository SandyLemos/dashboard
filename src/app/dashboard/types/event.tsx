export interface EventDate {
  id: string
  date: string
  startTime: string
  endTime: string
}

export interface Location {
  name: string // Nome do local (ex: "BeFly Minascentro")
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface Event {
  id: string
  title: string
  description: string
  dates: EventDate[]
  location: Location
  category:
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
  attendeeLimit?: number
  registeredAttendees: number
  // modificado
  status: "active" | "inactive" | "draft"
  acceptingRegistrations: boolean
  createdAt: string
  updatedAt: string
  ticketPrice?: number
  ticketsSold?: number
  imageUrl?: string
}

export interface EventFormData {
  title: string
  description: string
  dates: EventDate[]
  location: Location
  category: Event["category"]
  attendeeLimit?: number
  ticketPrice?: number
  acceptingRegistrations?: boolean
}

export interface Activity {
  id: string
  eventId: string
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  maxAttendees?: number
  registeredAttendees: number
  location: string
  speaker?: string
  createdAt: string
  updatedAt: string
}

export interface ActivityFormData {
  eventId: string
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  maxAttendees?: number
  location: string
  speaker?: string
}

export interface Sale {
  id: string
  eventId: string
  quantity: number
  totalAmount: number
  date: string
}

export interface Alert {
  id: string
  type: "warning" | "info" | "error"
  message: string
  eventId?: string
  actionLabel?: string
}

export interface Attendee {
  id: string
  eventId: string
  fullName: string
  email: string
  ticketType: string
  ticketPrice: number
  paymentStatus: "paid" | "pending" | "cancelled"
  purchaseDate: string
}

type EventScheduleItem = {
  day: string
  month: string
  title: string
  time: string
}

type EventData = {
  id: number
  title: string
  category: string
  imageHero: string
  dateRange: string
  fullDate: string
  time: string
  locationName: string
  address: string
  price: string
  description: string[]
  organizer: string
  schedule: EventScheduleItem[]
}

type EventDetailsMock = {
  [key: string]: EventData
  default: EventData // Garantir que 'default' está sempre presente
}