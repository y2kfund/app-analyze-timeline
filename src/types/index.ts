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
  api_payload?: {
    request_sent_to_openrouter: {
      model: string
      messages: any[]
      parameters: {
        max_tokens: number
        temperature: number
        top_p: number
        top_k: number
      }
    }
    response_received_from_openrouter: {
      raw_response: any
    }
  }
}

export interface FollowUpMessage {
  id: string
  conversation_id: string
  user_id: string
  question: string
  response: string
  created_at: string
  api_payload?: {
    request_sent_to_openrouter: {
      model: string
      messages: any[]
      parameters: {
        max_tokens: number
        temperature: number
        top_p: number
        top_k: number
      }
    }
    response_received_from_openrouter: {
      raw_response: any
    }
  }
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