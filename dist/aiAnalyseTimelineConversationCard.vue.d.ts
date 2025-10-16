import { Conversation } from './types/index';
interface Props {
    isOpen: boolean;
    conversations: Conversation[];
    date: string;
    loading?: boolean;
    supabaseClient?: any;
    userId?: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    loading: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
