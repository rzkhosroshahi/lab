type OrderStates =
    'pending'
    | 'confirmed'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

interface Observer {
    update(state: OrderStates): void
}

interface Subject {
    subscribe(observer: Observer | Observer[]): void;
    unsubscribe(observer: Observer): void;
    notify(state: OrderStates): void;
}

class Notification implements Subject {
    private observers: Observer[] = [];

    subscribe(observer: Observer | Observer[]): void {
        if (Array.isArray(observer)) {
            this.observers.push(...observer);
            return;
        }
        this.observers.push(observer);
    }
    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(state: OrderStates): void {
        for (let observer of this.observers) {
            observer.update(state);
        }
    }
}

class Order {
    constructor(private notificationCenter: Notification) { }

    checkout() {
        this.notificationCenter.notify('pending');
    }
    confirmed() {
        this.notificationCenter.notify('confirmed');
    }
    ship() {
        this.notificationCenter.notify('shipped');
    }
    delivered() {
        this.notificationCenter.notify('delivered');
    }
    cancelled() {
        this.notificationCenter.notify('cancelled');
    }

    process() {
        this.checkout();
        setTimeout(() => {
            this.confirmed();
        }, 200);
        setTimeout(() => {
            this.ship();
        }, 400);
        setTimeout(() => {
            this.delivered();
        }, 800);
        setTimeout(() => {
            this.cancelled();
        }, 1000);
    }
}
class EmailNotificationService implements Observer {
    update(state: OrderStates): void {
        console.log('email send to user...', state);
    }
}
class InventoryService implements Observer {
    private inventoryActions: Record<string, () => void> = {
        confirmed: this.decreaseInventory,
        cancelled: this.increaseInventory,
    }
    update(state: OrderStates): void {
        if (state in this.inventoryActions) {
            this.inventoryActions[state]();
        }
    }
    decreaseInventory() {
        console.log('decrease inventory');
    }
    increaseInventory() {
        console.log('rollback');
    }
}
class AnalyticsService implements Observer {
    update(state: OrderStates): void {
        console.log('the order state has changed! ', state);
    }
}
class FraudDetectionService implements Observer {
    update(state: OrderStates): void {
        if (state === 'pending') {
            console.log('running fraud check... ', state);
        }
    }
}
const notification = new Notification();
const order = new Order(notification);

const emailNotificationService = new EmailNotificationService();
const inventoryService = new InventoryService();
const analyticsService = new AnalyticsService();
const fraudDetectionService = new FraudDetectionService();

notification.subscribe([emailNotificationService, inventoryService, analyticsService, fraudDetectionService]);

order.process();

notification.unsubscribe(analyticsService);
order.checkout();
// shouldn't call the order state has changed!
