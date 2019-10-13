export class EmptyLineEncoder{
    static defaultEmptyLineMarker:string = "!--empty-line--!";
    static defaultNewLine:string = '\r\n';
    constructor(emptyLineMarker?: string, newLine?: string){
        this.emptyLineMarker = emptyLineMarker || EmptyLineEncoder.defaultEmptyLineMarker;
        this.newLine = newLine || EmptyLineEncoder.defaultNewLine;
    }
    emptyLineMarker: string;
    newLine: string;

    encode(text:string){
        return encodeEmptyLines(text, this.emptyLineMarker, this.newLine);
    }
    decode(text:string){
        return decodeEmptyLines(text, this.emptyLineMarker, this.newLine);
    }
}

export function encodeEmptyLines(text:string, emptyLineMarker?:string, newLine?:string){
    const marker = toComment(emptyLineMarker || EmptyLineEncoder.defaultEmptyLineMarker);

    const lines = text.split(/\r?\n/);
    
    const commentedLines = lines.map(line => line.trim() == '' ? marker : line);
    
    return commentedLines.join(newLine || EmptyLineEncoder.defaultNewLine);
}

export function decodeEmptyLines(text:string, emptyLineMarker?:string, newLine?:string){
    const marker = toComment(emptyLineMarker || EmptyLineEncoder.defaultEmptyLineMarker);

    var lines = text.split(/\r?\n/);

    const uncommentedLines = lines.map(line => line == marker ? '' : line);
    
    return uncommentedLines.join(newLine || EmptyLineEncoder.defaultNewLine);
}

function toComment(marker:string){
    return `/*${marker}*/`;
}