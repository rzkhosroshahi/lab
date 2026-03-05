class OldNotificationService {
  sendAlert(message: string, recipientEmail: string): void {
    console.log(`Sending alert: "${message}" to ${recipientEmail}`);
  }
}

interface NotificationProvider {
  notify(payload: {
    body: string;
    channel: "email" | "sms" | "push";
    to: string;
  }): void;
}

// already I have this
function sendWelcomeMessage(provider: NotificationProvider) {
  provider.notify({
    body: "Welcome to our platform!",
    channel: "email",
    to: "user@example.com",
  });
}

// Your task: Make OldNotificationService work with sendWelcomeMessage — without modifying either of them.
class NotificationAdaptor implements NotificationProvider {
    private oldNotificationService;
    constructor(oldService: OldNotificationService) {
        this.oldNotificationService = oldService;
    }
    notify(payload: { body: string; channel: "email" | "sms" | "push"; to: string; }): void {
        if (payload.channel === "email") {
            this.oldNotificationService.sendAlert(payload.body, payload.to);
        } else {
            console.warn(`Channel "${payload.channel}" is not supported by OldNotificationService.`);
        }
    }
}

// another problem combination adaptor and strategy
// PayPal's SDK
class PayPalSDK {
  makePayment(amount: number): void {
    console.log(`PayPal: processing $${amount}`);
  }
}

// Stripe's SDK (coming next month)
class StripeSDK {
  chargeCard(amount: number): void {
    console.log(`Stripe: charging $${amount}`);
  }
}

// Apple Pay SDK (coming later)
class ApplePaySDK {
  executePayment(amount: number): void {
    console.log(`Apple Pay: executing $${amount}`);
  }
}
interface Payment {
    pay: (amount: number) => void
}

class PaypalPaymentAdaptor implements Payment {
    private sdk = new PayPalSDK();
    
    pay (amount: number) {
        this.sdk.makePayment(amount);
    } 
}

class StrapiePaymentAdaptor implements Payment {
    private sdk = new StripeSDK();
    
    pay (amount: number) {
        this.sdk.chargeCard(amount);
    } 
}
class ApplePaymentAdaptor implements Payment {
    private sdk = new ApplePaySDK();
    
    pay (amount: number) {
        this.sdk.executePayment(amount);
    } 
}

const PaymentStrategies = {
    paypal: PaypalPaymentAdaptor,
    strapie: StrapiePaymentAdaptor,
    apple: ApplePaymentAdaptor
} as const;

function processCheckout(amount: number, paymentMethod: keyof typeof PaymentStrategies) {
    const payment = new PaymentStrategies[paymentMethod]();
    payment.pay(amount);
}