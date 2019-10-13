import {EmptyLineEncoder, decodeEmptyLines, encodeEmptyLines} from '../encoder';

const sample = `const x=1;

const y=2;

const z=3;`;

test('encode-decode', ()=>
  expect(normalizeCrlf(decodeEmptyLines(encodeEmptyLines(sample)))).toBe(normalizeCrlf(sample))
);

function normalizeCrlf(text: string){
   return text.split(/\r?\n/).join('\r\n'); 
}