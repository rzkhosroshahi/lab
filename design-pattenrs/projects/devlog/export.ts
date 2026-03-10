import fs from 'fs';

class ExportFile {
    writeFile(fileName: string, content: string) {
        fs.writeFile(`./${fileName}`, content, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log(`${fileName} File written successfully`);
        });
    }
}
class ThirdPartyPDFLib {
    toPDF(content: string) {
        console.log('Exporting to PDF with content >>', content);
    }
}

interface ExportStrategy {
    export: (content: string) => void
}

class ExportFileAdaptor implements ExportStrategy {
    private fileName: string = 'output.txt';
    constructor(private exportFile: ExportFile, fileName?: string) {
        if (fileName) this.fileName = fileName;
    }
    export(content: string) {
        this.exportFile.writeFile(this.fileName, content);
    };
}
class PDFExportAdaptor implements ExportStrategy {
    constructor(private pdfExport: ThirdPartyPDFLib) {}
    export(content: string) {
        this.pdfExport.toPDF(content);
    }
}
const exportStrategies = {
    text: new ExportFileAdaptor(new ExportFile(), 'output.txt'),
    json: new ExportFileAdaptor(new ExportFile(), 'output.json'),
    pdf: new PDFExportAdaptor(new ThirdPartyPDFLib())
} as const;

export type ExportFormat = keyof typeof exportStrategies;
// Exporter context
class Export {
    export(strategy: ExportFormat, content: string) {
        if (strategy in exportStrategies) {
            exportStrategies[strategy].export(content);
            return;
        }
        console.error('Invalid export strategy');
    }
}

export default Export;
