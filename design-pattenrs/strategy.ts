interface Parcel {
  weight: number;
  dimensions: { length: number; width: number; height: number };
}

// TODO: Define the ShippingStrategy Interface
interface ShippingStrategy {
    calculate(parcel?: Parcel): number;
}
// TODO: Implement the Concrete Strategies (FedEx, UPS, PostalService)
class FedexStrategy implements ShippingStrategy {
    calculate(parcel: Parcel): number {
        return parcel.weight * 2.5 + 15.00;
    }
}
class UpsStrategy implements ShippingStrategy {
    calculate(parcel: Parcel): number {
        if (parcel.weight > 10) {
            return parcel.weight * 1.1;
        }
        return parcel.weight * 1.5;
    }
}
class PostalService implements ShippingStrategy {
    calculate(): number {
        return 5.00 * 1.05;
    }
}
// TODO: Implement the Context (The ShippingCalculator)
class ShippingCalculator {
    private shippingStrategy?: ShippingStrategy;

    setShippingMethod(shippingStrategy: ShippingStrategy) {
        this.shippingStrategy = shippingStrategy;
    }
    calculate(parcel: Parcel) {
        if (this.shippingStrategy) return this.shippingStrategy.calculate(parcel);
    }
}

const shippingCalculator = new ShippingCalculator();

const shippingStrategies  = {
    'fedex': new FedexStrategy(),
    'ups': new UpsStrategy(),
    'postal': new PostalService()
} as const;

const shippingMethod: keyof typeof shippingStrategies = 'fedex';
shippingCalculator.setShippingMethod(shippingStrategies[shippingMethod]);

const parcel: Parcel = {
    weight: 100,
    dimensions: {
        length: 10,
        width: 100,
        height: 50
    }
}

const result = shippingCalculator.calculate(parcel);
