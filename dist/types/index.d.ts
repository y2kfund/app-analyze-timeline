export interface TimelineEvent {
    id: string;
    date: Date;
    title?: string;
    description?: string;
}
export interface AnalyzeTimelineProps {
    events?: TimelineEvent[];
    selectedEventId?: string;
}
