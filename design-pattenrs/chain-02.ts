/** Your Real-World Assignment

### Scenario: **ATM Cash Dispenser
You are building the cash dispensing logic for an ATM machine
When a user requests an amount (e.g. **$2350**), the ATM must dispense using the **largest bills possible first**, using these denomination
- **$500** bills
- **$200** bills
- **$100** bills
- **$50** bills
- **$20** bills
**/

interface DispenseRequest {
  originalAmount: number;
  remaining: number;
  dispensed: { bill: number; count: number }[];
}

interface Handler {
    setNext(handler: Handler): Handler;
    handle(amount: DispenseRequest): void;
}
abstract class Dispenser implements Handler {
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }
    handle(request: DispenseRequest): void {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
    }  
}

class BillDispenser extends Dispenser {
    constructor(private bill: number) {
        super();
    }
    handle(request: DispenseRequest): void {
        const count = Math.floor(request.remaining / this.bill);

        if (count > 0) {
            request.remaining -= count * this.bill;
            request.dispensed.push({ bill: this.bill, count });
        }

        if (request.remaining > 0) {
            super.handle(request);
        }
    }
}

class Atm {
    private head: Dispenser;

    constructor() {
        const d500 = new BillDispenser(500);
        const d200 = new BillDispenser(200);
        const d100 = new BillDispenser(100);
        const d50  = new BillDispenser(50);
        const d20  = new BillDispenser(20);
        d500.setNext(d200).setNext(d100).setNext(d50).setNext(d20);

        this.head = d500;
    }
    dispense(amount: number) {
        const request: DispenseRequest = {
            originalAmount: amount,
            remaining: amount,
            dispensed: []
        };
        this.head.handle(request);
        if (request.remaining > 0) {
            console.error(`error: $${amount} — not divisible evenly by available bills`); 
        } else {
            console.log(`Dispensing $${amount}:`);
            request.dispensed.forEach(({ bill, count }) => {
                console.log(`$${bill} x ${count}`);
            });
        }
    }
}

const atm = new Atm();
atm.dispense(2350);
console.log('---');
atm.dispense(180);
console.log('---');
atm.dispense(130);
console.log('---');
atm.dispense(1000);