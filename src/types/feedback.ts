export interface FeedbackType {
    type: 'toast' | 'snackBar';
    message: string;
    undoFunction?: () => void;
}
