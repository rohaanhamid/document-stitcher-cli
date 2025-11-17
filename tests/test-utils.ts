import { mkdir, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export const TEST_OUTPUT_DIR = join(process.cwd(), 'test-output');

export async function setupTestEnvironment() {
  if (!existsSync(TEST_OUTPUT_DIR)) {
    await mkdir(TEST_OUTPUT_DIR, { recursive: true });
  }
}

export async function cleanupTestEnvironment() {
  if (existsSync(TEST_OUTPUT_DIR)) {
    await rm(TEST_OUTPUT_DIR, { recursive: true, force: true });
  }
}

export function getTestFilePath(filename: string): string {
  return join(TEST_OUTPUT_DIR, filename);
}
