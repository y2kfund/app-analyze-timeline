<template>
  <div class="conversations-card">
    <div class="card-header">
      <h2 class="card-title">Conversations - {{ formattedDate }}</h2>
      
      <button class="card-close" @click="$emit('close')" aria-label="Close panel">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div class="card-body">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading conversations...</p>
      </div>

      <div v-else-if="!conversations || conversations.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <p>No conversations found for this date</p>
      </div>

      <div v-else class="conversations-list">
        <div 
          v-for="conv in conversations" 
          :key="conv.id" 
          class="conversation-card-item"
        >
          <div class="conversation-time">
            {{ formatTime(conv.created_at) }}
          </div>
          
          <div class="conversation-question">
            <div class="conversation-label">Question:</div>
            <div class="conversation-text">{{ conv.question }}</div>
          </div>
          
          <div class="conversation-answer">
            <div class="conversation-label">Answer:</div>
            <div class="conversation-text">{{ conv.response }}</div>
          </div>
          
          <div v-if="conv.screenshot_url" class="conversation-screenshot">
            <img 
              :src="conv.screenshot_url" 
              alt="Screenshot"
              @click="openScreenshot(conv.screenshot_url)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { Conversation } from './types/index'

interface Props {
  isOpen: boolean
  conversations: Conversation[]
  date: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'close': []
}>()

const formattedDate = computed(() => {
  if (!props.date) return ''
  const date = new Date(props.date)
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
})

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  })
}

const closeModal = () => {
  emit('close')
}

const openScreenshot = (url: string) => {
  window.open(url, '_blank')
}

// Close modal on Escape key
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
/*
|--------------------------------------------------------------------------
| BASE CARD STYLES
|--------------------------------------------------------------------------
*/
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
  flex-shrink: 0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  /* Prevent title from wrapping/expanding and force ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Leave space for the right-side button (adjust if you change button size) */
  max-width: calc(100% - 48px);
  line-height: 1;
}

/* Close button — styled like the minimize button in your reference */
.card-close {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  color: #6b7280;
  transition: all 0.15s;
  flex-shrink: 0; /* Prevents it from shrinking when space is tight */
  padding: 0;
}

.card-close:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
  color: #374151;
  transform: scale(1.05);
}

/* Make sure the SVG inside the button is sized correctly */
.card-close svg {
  width: 12px;
  height: 12px;
}

/* Accessibility focus ring */
.card-close:focus {
  outline: 3px solid rgba(59,130,246,0.15);
  outline-offset: 2px;
}

/* Small-screen tweak to avoid overflow */
@media (max-width: 420px) {
  .card-title {
    max-width: calc(100% - 44px);
  }
}

/*
|--------------------------------------------------------------------------
| BODY & CONTENT STATES
|--------------------------------------------------------------------------
*/
.card-body {
  flex-grow: 1;
  overflow-y: auto; /* Allows the content inside the card to scroll if it gets too long */
  padding-right: 0.5rem; /* Space for scrollbar */
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: #6b7280;
}

.empty-state svg {
  width: 4rem; /* 64px */
  height: 4rem; /* 64px */
  margin-bottom: 1rem;
  color: #d1d5db;
}

.spinner {
  /* Simple CSS spinner */
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 0.75rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/*
|--------------------------------------------------------------------------
| CONVERSATION LIST
|--------------------------------------------------------------------------
*/
.conversations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.conversation-card-item {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  transition: all 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

/* .conversation-card-item:hover {
  background-color: #ffffff;
  border-color: #d1d5db;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
} */

.conversation-time {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.75rem;
  border-bottom: 1px dashed #e5e7eb;
  padding-bottom: 0.5rem;
}

.conversation-question, .conversation-answer {
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.conversation-label {
  font-weight: 600;
  color: #4b5563;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.conversation-text {
  color: #6b7280;
  word-break: break-word;
}

.conversation-answer {
  margin-bottom: 0;
  padding-bottom: 0.5rem;
}

.conversation-answer .conversation-label {
  color: #10b981; /* Highlight answer label in green */
}

.conversation-screenshot {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.conversation-screenshot img {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
  cursor: pointer;
  display: block;
}

</style>
