export class EmptyLineEncoder{
    static defaultEmptyLineMarker:string = "!--empty-line--!";
    constructor(emptyLineMarker?: string){
        this.emptyLineMarker = emptyLineMarker || EmptyLineEncoder.defaultEmptyLineMarker;
    }
    emptyLineMarker: string;

    encode(text:string){
        return encodeEmptyLines(text, this.emptyLineMarker);
    }
    decode(text:string){
        return decodeEmptyLines(text, this.emptyLineMarker);
    }
}

export function encodeEmptyLines(text:string, emptyLineMarker?:string){
    const marker = toComment(emptyLineMarker || EmptyLineEncoder.defaultEmptyLineMarker);

    const lines = text.split(/\r?\n/);
    
    const commentedLines = lines.map(line => line.trim() == '' ? marker : line);
    
    return commentedLines.join('\r\n');
}

export function decodeEmptyLines(text:string, emptyLineMarker?:string){
    const marker = toComment(emptyLineMarker || EmptyLineEncoder.defaultEmptyLineMarker);

    var lines = text.split(/\r?\n/);

    const uncommentedLines = lines.map(line => line == marker ? '' : line);
    
    return uncommentedLines.join('\r\n');
}

function toComment(marker:string){
    return `/*${marker}*/`;
}