import { TimelineEvent, AnalyzeTimelineProps } from './types/index';
declare const _default: import('vue').DefineComponent<AnalyzeTimelineProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "event-selected": (event: TimelineEvent, position: {
        x: number;
        y: number;
    }) => any;
    navigate: (direction: "prev" | "next") => any;
}, string, import('vue').PublicProps, Readonly<AnalyzeTimelineProps> & Readonly<{
    "onEvent-selected"?: ((event: TimelineEvent, position: {
        x: number;
        y: number;
    }) => any) | undefined;
    onNavigate?: ((direction: "prev" | "next") => any) | undefined;
}>, {
    events: TimelineEvent[];
    selectedEventId: string;
    config: import('.').AnalyzeTimelineConfig;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
