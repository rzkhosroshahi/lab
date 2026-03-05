class BankVault {
    private constructor() {
        console.log("BankVault instance created!");
    }
    private static instance: BankVault | null = null;

    private balance: number = 1000000;
    public static getInstance(): BankVault {
        if (!this.instance) {
            this.instance = new BankVault();
        }

        return this.instance
    }
    deposit(amount: number) {
        this.balance +=  amount;
    }
    withdraw(amount: number) {
        if (this.balance - amount < 0) {
            throw new Error(`Insufficient funds. Balance: ${this.balance}`);
        }
        this.balance -= amount;
    }
    getBalance() {
        return this.balance;
    }
}

const BankManager = BankVault.getInstance();
const AuditTeam = BankVault.getInstance();
BankManager.deposit(50000);
AuditTeam.withdraw(200000);