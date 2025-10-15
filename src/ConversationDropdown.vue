<template>
  <div v-if="isOpen" class="dropdown-overlay" @click="$emit('close')">
    <div 
      class="dropdown-container" 
      :style="dropdownStyle"
      @click.stop
    >
      <div class="dropdown-header">
        <h3 class="dropdown-title">{{ formattedDate }}</h3>
        <button class="dropdown-close" @click="$emit('close')" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="dropdown-body">
        <div v-if="loading" class="dropdown-loading">
          <div class="spinner-small"></div>
          <span>Loading...</span>
        </div>

        <div v-else-if="sortedConversations.length === 0" class="dropdown-empty">
          <p>No conversations found</p>
        </div>

        <div v-else class="conversation-list">
          <div 
            v-for="conv in sortedConversations" 
            :key="conv.id"
            class="conversation-item"
            @click="selectConversation(conv.id)"
          >
            <div class="conversation-time">
              {{ formatTime(conv.created_at) }}
            </div>
            <div class="conversation-divider">|</div>
            <div class="conversation-question-text">
              {{ conv.question }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Conversation } from './types/index'

interface Props {
  conversations: Conversation[]
  position?: { x: number; y: number }
  isOpen: boolean
  loading?: boolean
  date?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  position: () => ({ x: 0, y: 0 })
})

const emit = defineEmits<{
  'conversation-selected': [conversationId: string]
  'close': []
}>()

// Sort conversations: oldest on top, newest on bottom
const sortedConversations = computed(() => {
  return [...props.conversations].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  })
})

const formattedDate = computed(() => {
  if (!props.date) {
    if (props.conversations.length > 0) {
      const date = new Date(props.conversations[0].created_at)
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      })
    }
    return 'Conversations'
  }
  const date = new Date(props.date)
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
})

const dropdownStyle = computed(() => {
  // Position dropdown near the clicked timeline dot
  // Adjust position to keep it within viewport
  const x = props.position.x
  const y = props.position.y + 60 // Offset below the timeline

  return {
    position: 'fixed' as const,
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translateX(-50%)' // Center horizontally on click point
  }
})

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  const tz = (date.toString().match(/\(([A-Za-z\s].*)\)/)?.[1] ?? '').match(/[A-Z]/g)?.join('') ?? ''
  return date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  }) + (tz ? ' ' + tz : '')
}

const selectConversation = (conversationId: string) => {
  emit('conversation-selected', conversationId)
}
</script>

<style scoped>
.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent;
}

.dropdown-container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  min-width: 400px;
  max-width: 600px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  animation: dropdownSlideIn 0.2s ease-out;
}

@keyframes dropdownSlideIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 0.5rem 0.5rem 0 0;
}

.dropdown-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.dropdown-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: all 0.15s;
}

.dropdown-close:hover {
  background: #e5e7eb;
  color: #374151;
}

.dropdown-body {
  overflow-y: auto;
  max-height: 420px;
  padding: 0.5rem;
}

.dropdown-loading,
.dropdown-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.spinner-small {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.conversation-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  background: white;
}

.conversation-item:hover {
  background: #f9fafb;
  border-color: #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.conversation-item:active {
  background: #f3f4f6;
  transform: scale(0.98);
}

.conversation-time {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 80px;
}

.conversation-divider {
  color: #d1d5db;
  font-weight: 300;
  flex-shrink: 0;
}

.conversation-question-text {
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.4;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .dropdown-container {
    min-width: 320px;
    max-width: calc(100vw - 2rem);
  }

  .conversation-time {
    min-width: 70px;
    font-size: 0.7rem;
  }

  .conversation-question-text {
    font-size: 0.8125rem;
  }
}
</style>
