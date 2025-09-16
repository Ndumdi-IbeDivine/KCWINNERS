export interface User {
    _id: string;
    activatedAt: string | null;
    createdAt: string;
    email: string;
    isActivated: boolean;
    isVerified: boolean;
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
    _id: string;
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

export interface TransactionsResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  count: number;
  data: Transaction[];
}

export interface Transaction {
  _id: string;
  userId: string;
  contributionAccountId: string;
  type: "weekly_contribution" | "monthly_contribution" | string;
  amount: number;
  status: "success" | "failed" | "pending";
  narration: string;
  createdAt: string;
  __v: number;
}

export interface Revenue { month: string; total: number }
