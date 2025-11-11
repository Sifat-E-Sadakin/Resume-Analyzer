import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function parseDocument(buffer: Buffer, filename: string): Promise<string> {
  const extension = filename.toLowerCase().split('.').pop();
  
  if (extension === 'pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (extension === 'docx') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error('Unsupported file format. Please upload PDF or DOCX files.');
  }
}
