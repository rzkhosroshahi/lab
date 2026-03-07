/**
 * You're building an e-commerce backend. When a customer places an order, many subsystems need to work together. Your job is to create a OrderFacade that hides this complexity.
 * Build these 4 subsystems:
 * 1 - InventoryService — has a method to check if an item is in stock and another to reserve it (reduce count).
 * 2 - PaymentService — has a method to validate a payment method and another to charge an amount.
 * 3 - ShippingService — has a method to create a shipment and another to generate a tracking number.
 * 4 - NotificationService — has a method to send an order confirmation email and another to send a shipping notification.
 * Then build the Facade:
 * 5 - OrderFacade — must have a placeOrder(productId, quantity, paymentInfo) method that orchestrates all 4 subsystems in the correct order.
 * 6 - Also add a cancelOrder(orderId) method that coordinates the appropriate subsystems to reverse an order.
 * 7 - The client code (your main.ts) should only ever interact with OrderFacade — never directly with subsystems.
 * **/
class InventoryService {
    serverResponse: Record<string, number>
    constructor() {
        // server mock
        this.serverResponse = {
            '1001': 1,
            '500': 0
        };
    }
    checkQuantity(productId: string) {
        return Boolean(this.serverResponse[productId]);
    }
    reserveItem(productId: string) {
        if (!this.checkQuantity(productId)) {
            throw Error('This product is out of order')
        }
        this.serverResponse[productId] -= 1;
    }
    rollBack(productId: string) {
        if (this.checkQuantity(productId)) {
            this.serverResponse[productId] += 1;
        }
    }
}
class PaymentService {
    private paymentMethods: Record<string, (amount: number) => void>
    // bank class can implement too
    private userBalance: number = 10000000;
    constructor() {
        this.paymentMethods = {
            payPal: this.payPalCharge,
            apple: this.appleCharge,
        }
    }
    private payPalCharge(amount: number) {
        console.log('PayPal: You Payed for ', amount)
    }
    private appleCharge(amount: number) {
        console.log('Apple: You Payed for ', amount)
    }
    private validatePayment(paymentMethod: string) {
        if (!this.paymentMethods.hasOwnProperty(paymentMethod)) {
            throw Error('Payment method is not valid');
        }
        return true;
    }
    pay(paymentMethod: string, amount: number) {
        if (this.validatePayment(paymentMethod)) {
            this.paymentMethods[paymentMethod](amount);
            this.userBalance -= amount;
        }
    }
    rollback() {
        // read last item from database and do the next line
        // this.userBalance += amount;
    }
}
// server shipping items db
type ShippingInstance = {
    trackingNumber: number;
    state: 'SEND' | 'RECEIVED'
    productId: string
};
const shippingItems: Map<number, ShippingInstance> = new Map();
class ShippingService {
    deliver(productId: string) {
        const trackingNumber = Math.random();
        const state = 'SEND';
        shippingItems.set(trackingNumber, {
            trackingNumber,
            state,
            productId,
        })

    }
    getItemState(trackingNumber: number) {
        if (!shippingItems.has(trackingNumber)) {
            throw Error(`The tracking number is not valid: - ${trackingNumber}`)
        }
        return shippingItems.get(trackingNumber)?.state;
    }

    getTrackingNumberByProductId(productId: string): null | number {
        let trackingNumber = null;
        for (let [orderId, order] of shippingItems.entries()) {
            if(order.productId === productId) trackingNumber = orderId;
        }
        return trackingNumber;
    }
    cancelOrder(productId: string) {
        const trackingNumber = this.getTrackingNumberByProductId(productId);
        if (trackingNumber) {
            shippingItems.delete(trackingNumber);
        }
    }
}
class NotificationService {
    private ShippingService: ShippingService;
    
    constructor() {
        this.ShippingService = new ShippingService();
    }
    notify(message: string) {
        alert(message);
    }

    orderConfirmed(productId: string) {
        this.notify(`Your receiving the email because your order for the ${productId} has been confirmed`);
    }
    notifyShippingService(trackingNumber: number) {
        this.notify(`
            The shipment company received your order. here its your tracking number: ${trackingNumber}.
            Your order state is: ${this.ShippingService.getItemState(trackingNumber)}
        `); 
        
    }
}
class OrderFacade {
    private InventoryService: InventoryService;
    private PaymentService: PaymentService;
    private ShippingService: ShippingService;
    private NotificationService: NotificationService;

    constructor() {
        this.InventoryService = new InventoryService();
        this.PaymentService = new PaymentService();
        this.ShippingService = new ShippingService();
        this.NotificationService = new NotificationService();
    }
    placeOrder(productId: string, quantity: number, paymentInfo: { paymentMethod: string, price: number }) {
        try {
            this.InventoryService.reserveItem(productId);
            this.PaymentService.pay(paymentInfo.paymentMethod, paymentInfo.price);
            this.ShippingService.deliver(productId);
            this.NotificationService.orderConfirmed(productId);
        } catch(error) {
            this.cancelOrder(productId);
            throw error;
        }

    }
    cancelOrder(productId: string) {
        this.InventoryService.rollBack(productId);
        this.PaymentService.rollback();
        this.ShippingService.cancelOrder(productId);
        this.NotificationService.notify('Order has been canceled');
    }
}