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
    sex: string;
    bankName: string;
    accountNumber: string;
    residentialAddress: string;
    nextOfKin: {
        name: string;
        phone: string;
        address: string;
    };
    referralCode: string;
    registrationFee: File | null;
}

export interface Contribution {
    clearanceFeePaid: boolean;
    clearedDefaults: boolean;
    code: string;
    defaults: number;
    dueDate: string;
    dueDatePlusOneWeek: string;
    firstThursday: string;
    isPrimary: boolean;
    referralCode: string;
    referralCount: number;
    referredBy: string | null;
    startDate: string;
    status: string;
    totalPaid: number;
    userId: string;
    weeksPaid: number;
}
