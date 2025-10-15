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

          <div v-if="conv.screenshot_url" class="conversation-screenshot">
            <img 
              :src="conv.screenshot_url" 
              alt="Screenshot"
              @click="openScreenshot(conv.screenshot_url)"
            />
          </div>
          
          <div class="conversation-answer">
            <div class="conversation-label">Answer:</div>
            <div class="conversation-text" v-html="convertTextToHtml(conv.response)"></div>
          </div>

          <!-- Follow-up Chat Section -->
          <div class="follow-up-section">
            <div class="follow-up-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Follow-up Chat</span>
            </div>

            <div class="follow-up-chat">
              <!-- Loading follow-ups -->
              <div v-if="loadingFollowUps[conv.id]" class="follow-up-loading">
                <div class="spinner-small"></div>
                <span>Loading previous messages...</span>
              </div>

              <!-- Follow-up messages -->
              <div v-else-if="followUpMessages[conv.id]?.length > 0" class="follow-up-messages" v-for="msg in followUpMessages[conv.id]" :key="msg.id">
                <div class="follow-up-message">
                  <div class="follow-up-question">
                    <div class="message-label">You:</div>
                    <div class="message-text">{{ msg.question }}</div>
                  </div>
                  <div class="follow-up-response">
                    <div class="message-label">AI:</div>
                    <div class="message-text" v-html="convertTextToHtml(msg.response)"></div>
                  </div>
                </div>
              </div>

              <!-- Input area -->
              <div class="follow-up-input">
                <textarea 
                  v-model="followUpQuestions[conv.id]"
                  placeholder="Type your follow-up question..."
                  rows="3"
                  :disabled="sendingFollowUp[conv.id]"
                  @keydown.ctrl.enter="sendFollowUp(conv)"
                  @keydown.meta.enter="sendFollowUp(conv)"
                ></textarea>
                <button 
                  @click="sendFollowUp(conv)"
                  :disabled="!followUpQuestions[conv.id]?.trim() || sendingFollowUp[conv.id]"
                  class="send-button"
                >
                  <span v-if="!sendingFollowUp[conv.id]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send
                  </span>
                  <span v-else>
                    <div class="spinner-small"></div>
                    Sending...
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue'
import type { Conversation, FollowUpMessage } from './types/index'

interface Props {
  isOpen: boolean
  conversations: Conversation[]
  date: string
  loading?: boolean
  supabaseClient?: any
  userId?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'close': []
}>()

// State for follow-up chats
const followUpQuestions = ref<Record<string, string>>({})
const followUpMessages = ref<Record<string, FollowUpMessage[]>>({})
const loadingFollowUps = ref<Record<string, boolean>>({})
const sendingFollowUp = ref<Record<string, boolean>>({})

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
  const tz = (date.toString().match(/\(([A-Za-z\s].*)\)/)?.[1] ?? '').match(/[A-Z]/g)?.join('') ?? '';
  return date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  }) + ' ' + tz
}

function convertTextToHtml(text: string): string {
  // Step 1: Protect code blocks from other conversions
  const codeBlocks: string[] = []
  let htmlContent = text.replace(/```([\s\S]*?)```/g, (code) => {
    codeBlocks.push(code.trim())
    return `___CODE_BLOCK_${codeBlocks.length - 1}___`
  })

  // Step 2: Convert headers (from most specific to least)
  htmlContent = htmlContent.replace(/^\s*\#\#\#\#\s+(.*)$/gm, '<h4>$1</h4>')
  htmlContent = htmlContent.replace(/^\s*\#\#\#\s+(.*)$/gm, '<h3>$1</h3>')
  htmlContent = htmlContent.replace(/^\s*\#\#\s+(.*)$/gm, '<h2>$1</h2>')
  htmlContent = htmlContent.replace(/^\s*\#\s+(.*)$/gm, '<h1>$1</h1>')

  // Step 3: Convert bold text
  htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Step 4: Convert bullet lists (• or -)
  htmlContent = htmlContent.replace(/^[\s]*[•\-]\s+(.*)$/gm, '<li>$1</li>')
  htmlContent = htmlContent.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  // Step 5: Convert line breaks
  htmlContent = htmlContent.replace(/\n/g, '<br/>')

  // Step 6: Clean up extra breaks after block elements
  htmlContent = htmlContent.replace(/<\/(h[1-4]|ul)><br\/>/g, '</$1>')
  htmlContent = htmlContent.replace(/<ul><br\/>/g, '<ul>')
  htmlContent = htmlContent.replace(/<\/ul><br\/>/g, '</ul>')

  // Step 7: Restore code blocks
  codeBlocks.forEach((code, index) => {
    htmlContent = htmlContent.replace(
      `___CODE_BLOCK_${index}___`,
      `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    )
  })

  return `
    <section>
      ${htmlContent}
    </section>
  `.trim()
}

// Load follow-up messages for a conversation
const loadFollowUps = async (conversationId: string) => {
  if (!props.supabaseClient || !props.userId) {
    console.warn('Supabase client or user ID not available')
    return
  }

  // Skip if already loaded or currently loading
  if (followUpMessages.value[conversationId] || loadingFollowUps.value[conversationId]) {
    return
  }

  loadingFollowUps.value[conversationId] = true

  try {
    const { data, error } = await props.supabaseClient
      .schema('hf')
      .from('ai_conversation_followups')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error) throw error

    followUpMessages.value[conversationId] = data || []
  } catch (error) {
    console.error('Error loading follow-ups:', error)
    followUpMessages.value[conversationId] = []
  } finally {
    loadingFollowUps.value[conversationId] = false
  }
}

// Load all follow-ups when conversations are available
const loadAllFollowUps = async () => {
  if (!props.conversations || props.conversations.length === 0) {
    return
  }

  // Load follow-ups for all conversations
  await Promise.all(
    props.conversations.map(conv => loadFollowUps(conv.id))
  )
}

// Load follow-ups on mount and when conversations change
onMounted(() => {
  loadAllFollowUps()
})

// Watch for changes in conversations
watch(() => props.conversations, () => {
  loadAllFollowUps()
}, { deep: true })

// Watch for when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    loadAllFollowUps()
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }
})

// Send a follow-up question
const sendFollowUp = async (conv: Conversation) => {
  const question = followUpQuestions.value[conv.id]?.trim()
  
  if (!question || !props.supabaseClient || !props.userId) {
    return
  }

  sendingFollowUp.value[conv.id] = true

  try { 
    // Call AI API with context
    const response = await fetch('https://www.y2k.fund/api/ai-analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        screenshot: conv.screenshot_url,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        context: {
          previousQuestion: conv.question,
          previousResponse: conv.response,
          conversationId: conv.id
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    const data = await response.json()

    // Save follow-up to database
    const { data: savedFollowUp, error: saveError } = await props.supabaseClient
      .schema('hf')
      .from('ai_conversation_followups')
      .insert({
        conversation_id: conv.id,
        user_id: props.userId,
        question,
        response: data.response
      })
      .select()
      .single()

    if (saveError) throw saveError

    // Add to local state
    if (!followUpMessages.value[conv.id]) {
      followUpMessages.value[conv.id] = []
    }
    followUpMessages.value[conv.id].push(savedFollowUp)

    // Clear input
    followUpQuestions.value[conv.id] = ''

  } catch (error) {
    console.error('Error sending follow-up:', error)
    alert('Failed to send follow-up question. Please try again.')
  } finally {
    sendingFollowUp.value[conv.id] = false
  }
}

const closeModal = () => {
  emit('close')
}

const openScreenshot = (url: string) => {
  window.open(url, '_blank')
}
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

.conversation-text :deep(section h3),
.conversation-text :deep(section h4) {
  margin-bottom: 0.2em;
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

/*
|--------------------------------------------------------------------------
| FOLLOW-UP CHAT SECTION
|--------------------------------------------------------------------------
*/
.follow-up-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.follow-up-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 600;
}

.follow-up-header svg {
  width: 16px;
  height: 16px;
  color: #3b82f6;
}

.follow-up-chat {
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.follow-up-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
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

.follow-up-messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.follow-up-message {
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.375rem;
  border-left: 3px solid #3b82f6;
}

.follow-up-question,
.follow-up-response {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.follow-up-response {
  margin-bottom: 0;
}

.message-label {
  font-weight: 600;
  color: #374151;
  flex-shrink: 0;
  min-width: 35px;
}

.follow-up-question .message-label {
  color: #3b82f6;
}

.follow-up-response .message-label {
  color: #10b981;
}

.message-text {
  color: #6b7280;
  line-height: 1.5;
  word-break: break-word;
}

.follow-up-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.follow-up-input textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s;
}

.follow-up-input textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.follow-up-input textarea:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.send-button {
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.send-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.send-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.send-button svg {
  width: 16px;
  height: 16px;
}

.conversation-text :deep(section h1),
.conversation-text :deep(section h2),
.conversation-text :deep(section h3),
.conversation-text :deep(section h4),
.message-text :deep(section h1),
.message-text :deep(section h2),
.message-text :deep(section h3),
.message-text :deep(section h4) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  font-weight: 600;
}

.conversation-text :deep(section h1),
.message-text :deep(section h1) {
  font-size: 1.25rem;
  color: #111827;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.conversation-text :deep(section h2),
.message-text :deep(section h2) {
  font-size: 1.125rem;
  color: #1f2937;
}

.conversation-text :deep(section h3),
.message-text :deep(section h3) {
  font-size: 1rem;
  color: #374151;
}

.conversation-text :deep(section h4),
.message-text :deep(section h4) {
  font-size: 0.875rem;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.conversation-text :deep(section strong),
.message-text :deep(section strong) {
  font-weight: 600;
  color: #111827;
}

/* Remove top margin from first header */
.conversation-text :deep(section h1:first-child),
.conversation-text :deep(section h2:first-child),
.conversation-text :deep(section h3:first-child),
.conversation-text :deep(section h4:first-child),
.message-text :deep(section h1:first-child),
.message-text :deep(section h2:first-child),
.message-text :deep(section h3:first-child),
.message-text :deep(section h4:first-child) {
  margin-top: 0;
}

/* Add these styles after the existing header styles */

/* Lists */
.conversation-text :deep(section ul),
.message-text :deep(section ul) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  list-style: none;
}

.conversation-text :deep(section li),
.message-text :deep(section li) {
  position: relative;
  padding-left: 0.5rem;
  margin-bottom: 0.375rem;
  color: #374151;
  line-height: 1.6;
}

.conversation-text :deep(section li::before),
.message-text :deep(section li::before) {
  content: "•";
  position: absolute;
  left: -1rem;
  color: #3b82f6;
  font-weight: bold;
}

/* Code blocks */
.conversation-text :deep(section pre),
.message-text :deep(section pre) {
  background: #1f2937;
  color: #e5e7eb;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 0.8125rem;
  line-height: 1.5;
}

.conversation-text :deep(section code),
.message-text :deep(section code) {
  display: block;
  white-space: pre;
}

/* Inline code (if any) */
.conversation-text :deep(section p code),
.message-text :deep(section p code),
.conversation-text :deep(section li code),
.message-text :deep(section li code) {
  display: inline;
  background: #f3f4f6;
  color: #dc2626;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
}

/* Remove extra margin from first/last elements in lists */
.conversation-text :deep(section ul li:first-child),
.message-text :deep(section ul li:first-child) {
  margin-top: 0;
}

.conversation-text :deep(section ul li:last-child),
.message-text :deep(section ul li:last-child) {
  margin-bottom: 0;
}

/* Nested elements spacing */
.conversation-text :deep(section ul + p),
.conversation-text :deep(section pre + p),
.message-text :deep(section ul + p),
.message-text :deep(section pre + p) {
  margin-top: 1rem;
}

</style>
