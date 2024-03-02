export interface EditorType {
    imageUrl: string;
    role: "MEMBER" | "OWNER";
    userId: number;
    userName: string;
    isOnline?: boolean;
}