import { Conversation } from './types/index';
interface Props {
    conversations: Conversation[];
    position?: {
        x: number;
        y: number;
    };
    isOpen: boolean;
    loading?: boolean;
    date?: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => any;
    "conversation-selected": (conversationId: string) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClose?: (() => any) | undefined;
    "onConversation-selected"?: ((conversationId: string) => any) | undefined;
}>, {
    loading: boolean;
    position: {
        x: number;
        y: number;
    };
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
