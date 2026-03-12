type UserData = {
    name: string;
    location: string;
    code: string;
};

const data: UserData[] = [
    {
        name: 'reza khosroshahi',
        location: 'iran',
        code: '123456789',
    },
    {
        name: 'dohn joe',
        location: 'USA',
        code: '987654321',
    },
    {
        name: 'john leone',
        location: 'Mexico',
        code: '987654321',
    },
];

interface Exporter<T> {
    export(data: T[]): string;
}

class JSONSerialization<T> implements Exporter<T> {
    export(data: T[]): string {
        return JSON.stringify(data);
    }
}

abstract class ExporterDecorator<T> implements Exporter<T> {
    constructor(protected wrappedExporter: Exporter<T>) {}

    export(data: T[]): string {
        return this.wrappedExporter.export(data);
    }
}

class MaskUserCode<T extends UserData> extends ExporterDecorator<T> {
    export(data: T[]): string {
        const newData = data.map((usr) => ({
            ...usr,
            code: '*'.repeat(usr.code.length - 4) + usr.code.slice(-4),
        }));

        return super.export(newData);
    }
}

class FilterCountry<T extends UserData> extends ExporterDecorator<T> {
    constructor(protected wrappedExporter: Exporter<T>, private country: string) {
        super(wrappedExporter);
    }
    export(data: T[]): string {
        const newData = data.filter((usr) => usr.location !== this.country);

        return super.export(newData);
    }
}
const exporter = new FilterCountry(new MaskUserCode(
    new JSONSerialization<UserData>(),
), 'Mexico');

const json = exporter.export(data);
console.log('json >>', json);
