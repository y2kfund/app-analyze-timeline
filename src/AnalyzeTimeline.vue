<template>
  <div class="analyze-timeline">
    <button 
      class="timeline-nav timeline-nav-prev" 
      @click="navigatePrev"
      :disabled="currentIndex === 0"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="timeline-container">
      <div class="timeline-track">
        <div class="timeline-line"></div>
        <div 
          v-for="(event, index) in visibleEvents" 
          :key="event.id"
          class="timeline-event"
          :class="{ 'active': selectedEventId === event.id }"
          :style="{ left: `${getEventPosition(index)}%` }"
          @click="selectEvent(event)"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-date">
            {{ formatDate(event.date) }}
          </div>
        </div>
      </div>
    </div>

    <button 
      class="timeline-nav timeline-nav-next" 
      @click="navigateNext"
      :disabled="currentIndex >= events.length - visibleCount"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TimelineEvent, AnalyzeTimelineProps } from './types/index'

const props = withDefaults(defineProps<AnalyzeTimelineProps>(), {
  events: () => [
    { id: '1', date: new Date('2024-03-20'), title: 'Event 1', description: 'First event' },
    { id: '2', date: new Date('2024-05-20'), title: 'Event 2', description: 'Second event' },
    { id: '3', date: new Date('2024-07-09'), title: 'Event 3', description: 'Third event' },
    { id: '4', date: new Date('2024-08-15'), title: 'Event 4', description: 'Fourth event' },
    { id: '5', date: new Date('2024-09-22'), title: 'Event 5', description: 'Fifth event' },
  ],
  selectedEventId: undefined,
  config: undefined
})

const emit = defineEmits<{
  'event-selected': [event: TimelineEvent]
  'navigate': [direction: 'prev' | 'next']
}>()

const currentIndex = ref(0)
const visibleCount = 3
const databaseEvents = ref<TimelineEvent[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const events = computed(() => {
  // Use database events if available, otherwise use props.events
  return databaseEvents.value.length > 0 ? databaseEvents.value : props.events
})

const visibleEvents = computed(() => {
  return events.value.slice(currentIndex.value, currentIndex.value + visibleCount)
})

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

const getEventPosition = (index: number): number => {
  // Distribute events evenly across the timeline
  if (visibleEvents.value.length === 1) return 50
  return (index / (visibleEvents.value.length - 1)) * 100
}

const navigatePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    emit('navigate', 'prev')
  }
}

const navigateNext = () => {
  if (currentIndex.value < events.value.length - visibleCount) {
    currentIndex.value++
    emit('navigate', 'next')
  }
}

const selectEvent = (event: TimelineEvent) => {
  emit('event-selected', event)
}

// Fetch timeline dates from database
const fetchTimelineDates = async () => {
  if (!props.config?.enableDatabase || !props.config?.supabaseClient || !props.config?.userId) {
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const { data, error: fetchError } = await props.config.supabaseClient
      .schema('hf')
      .from('ai_conversations')
      .select('created_at')
      .eq('user_id', props.config.userId)
      .order('created_at', { ascending: true })

    if (fetchError) {
      throw fetchError
    }

    if (data && data.length > 0) {
      // Extract unique dates
      const uniqueDates = new Set<string>()
      data.forEach((item: any) => {
        const date = new Date(item.created_at).toISOString().split('T')[0]
        uniqueDates.add(date)
      })

      // Convert to timeline events and sort by date ascending (oldest to newest)
      databaseEvents.value = Array.from(uniqueDates)
        .map((dateStr) => ({
          id: dateStr,
          date: new Date(dateStr),
          title: `Conversations on ${dateStr}`,
          description: `AI conversations from ${dateStr}`
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
      
      // Start at the most recent dates (end of timeline)
      const maxIndex = Math.max(0, databaseEvents.value.length - visibleCount)
      currentIndex.value = maxIndex
    }
  } catch (err: any) {
    console.error('Error fetching timeline dates:', err)
    error.value = err.message || 'Failed to fetch timeline data'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTimelineDates()
})
</script>

<style scoped>
.analyze-timeline {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  width: 100%;
}

.timeline-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
  flex-shrink: 0;
}

.timeline-nav:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #3b82f6;
  transform: scale(1.05);
}

.timeline-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.timeline-nav svg {
  width: 16px;
  height: 16px;
}

.timeline-container {
  flex: 1;
  min-width: 0;
  padding: 0 1rem;
}

.timeline-track {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
}

.timeline-line {
  position: absolute;
  top: 34%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
  transform: translateY(-50%);
}

.timeline-event {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

.timeline-event:hover .timeline-dot {
  background: #3b82f6;
  transform: scale(1.3);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.timeline-event.active .timeline-dot {
  background: #3b82f6;
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: #94a3b8;
  border: 2px solid white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.timeline-date {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.timeline-event:hover .timeline-date,
.timeline-event.active .timeline-date {
  color: #3b82f6;
  font-weight: 700;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .analyze-timeline {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .timeline-nav {
    width: 28px;
    height: 28px;
  }

  .timeline-container {
    padding: 0 0.5rem;
  }

  .timeline-date {
    font-size: 0.7rem;
  }
}
</style>
