# app-analyze-timeline

A Vue 3 timeline component for visualizing events chronologically with an interactive horizontal timeline interface.

## Features

- 🎯 Interactive horizontal timeline with date markers
- 🔄 Navigation controls (previous/next)
- 🎨 Clean, modern design matching the Y2K Fund aesthetic
- 📱 Fully responsive
- ⚡ Built with Vue 3 + TypeScript + Vite
- 🎭 Event selection and navigation callbacks

## Installation

```bash
npm install @y2kfund/analyze-timeline
```

## Usage

```vue
<script setup lang="ts">
import { AnalyzeTimeline } from '@y2kfund/analyze-timeline'
import type { TimelineEvent } from '@y2kfund/analyze-timeline'
import '@y2kfund/analyze-timeline/dist/style.css'

const handleEventSelected = (event: TimelineEvent) => {
  console.log('Event selected:', event)
}

const handleNavigate = (direction: 'prev' | 'next') => {
  console.log('Navigate:', direction)
}
</script>

<template>
  <AnalyzeTimeline 
    @event-selected="handleEventSelected"
    @navigate="handleNavigate"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `TimelineEvent[]` | Demo data | Array of timeline events to display |
| `selectedEventId` | `string` | `undefined` | ID of the currently selected event |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `event-selected` | `TimelineEvent` | Emitted when a timeline event is clicked |
| `navigate` | `'prev' \| 'next'` | Emitted when navigation arrows are clicked |

## Types

```typescript
interface TimelineEvent {
  id: string
  date: Date
  title?: string
  description?: string
}
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Preview the build
npm run preview
```

## License

MIT
