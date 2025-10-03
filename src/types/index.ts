export interface TimelineEvent {
  id: string
  date: Date
  title: string
  description: string
}

export interface Conversation {
  id: string
  user_id: string
  question: string
  response: string
  screenshot_url: string | null
  created_at: string
}

export interface AnalyzeTimelineConfig {
  supabaseClient: any
  userId: string
  enableDatabase: boolean
}

export interface AnalyzeTimelineProps {
  events?: TimelineEvent[]
  selectedEventId?: string
  config?: AnalyzeTimelineConfig
}