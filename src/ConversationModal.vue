<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Conversations - {{ formattedDate }}</h2>
            <button class="modal-close" @click="closeModal" aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <!-- Loading state -->
            <div v-if="loading" class="loading-state">
              <div class="spinner"></div>
              <p>Loading conversations...</p>
            </div>

            <!-- Empty state -->
            <div v-else-if="!conversations || conversations.length === 0" class="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>No conversations found for this date</p>
            </div>

            <!-- Conversations list -->
            <div v-else class="conversations-list">
              <div 
                v-for="conv in conversations" 
                :key="conv.id" 
                class="conversation-card"
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
      </div>
    </Transition>
  </Teleport>
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.modal-container {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(18, 18, 32, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(135deg, #60efff 0%, #0061ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-close {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.6);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  transform: rotate(90deg);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.loading-state p,
.empty-state p {
  margin-top: 16px;
  font-size: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(96, 239, 255, 0.1);
  border-top-color: #60efff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state svg {
  opacity: 0.3;
}

.conversations-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.conversation-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.conversation-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.conversation-time {
  display: inline-block;
  background: rgba(96, 239, 255, 0.1);
  color: #60efff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}

.conversation-question,
.conversation-answer {
  margin-bottom: 16px;
}

.conversation-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  opacity: 0.7;
}

.conversation-question .conversation-label {
  color: #60efff;
}

.conversation-answer .conversation-label {
  color: #7eff7e;
}

.conversation-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  padding-left: 16px;
  border-left: 3px solid;
}

.conversation-question .conversation-text {
  border-color: rgba(96, 239, 255, 0.3);
}

.conversation-answer .conversation-text {
  border-color: rgba(126, 255, 126, 0.3);
}

.conversation-screenshot {
  margin-top: 16px;
}

.conversation-screenshot img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.conversation-screenshot img:hover {
  transform: scale(1.02);
  border-color: rgba(96, 239, 255, 0.5);
  box-shadow: 0 8px 24px rgba(96, 239, 255, 0.2);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95) translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
    border-radius: 20px 20px 0 0;
    max-width: 100%;
  }

  .modal-header {
    padding: 20px 24px;
  }

  .modal-header h2 {
    font-size: 20px;
  }

  .modal-body {
    padding: 24px;
  }

  .conversation-card {
    padding: 20px;
  }
}
</style>
