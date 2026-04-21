import xlsx from 'xlsx';
const { readFile, utils } = xlsx;
import * as fs from 'fs';

try {
  const workbook = readFile('planilha.xlsx');
  const sheetNames = workbook.SheetNames;
  
  console.log('Sheet Names:', sheetNames);
  
  for (const sheetName of sheetNames) {
    console.log(`\n--- Sheet: ${sheetName} ---`);
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet, { header: 1 });
    // Print first 10 rows
    for (let i = 0; i < Math.min(10, data.length); i++) {
      console.log(`Row ${i + 1}:`, JSON.stringify(data[i]));
    }
  }
} catch (error) {
  console.error('Error reading xlsx:', error.message);
}
