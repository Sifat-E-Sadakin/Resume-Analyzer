import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function parseDocument(buffer: Buffer, filename: string): Promise<string> {
  const extension = filename.toLowerCase().split('.').pop();
  
  if (extension === 'pdf') {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  } else if (extension === 'docx') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error('Unsupported file format. Please upload PDF or DOCX files.');
  }
}
