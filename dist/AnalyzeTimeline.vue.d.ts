import { TimelineEvent, AnalyzeTimelineProps } from './types';
declare const _default: import('vue').DefineComponent<AnalyzeTimelineProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "event-selected": (event: TimelineEvent) => any;
    navigate: (direction: "prev" | "next") => any;
}, string, import('vue').PublicProps, Readonly<AnalyzeTimelineProps> & Readonly<{
    "onEvent-selected"?: ((event: TimelineEvent) => any) | undefined;
    onNavigate?: ((direction: "prev" | "next") => any) | undefined;
}>, {
    events: TimelineEvent[];
    selectedEventId: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
