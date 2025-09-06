export interface User {
    _id: string;
    activatedAt: string | null;
    createdAt: string;
    email: string;
    isActivated: boolean;
    name: string;
    phone: string;
    role: "user" | "admin";
    totalContributed: number;
    walletBalance: number;
}
