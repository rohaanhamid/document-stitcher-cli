import { describe, test, expect, afterEach } from "bun:test";
import * as fs from "fs";
import * as path from "path";
import { createTempDirectory, cleanupTempFiles } from "./files";
import { PdfSource } from "../types";

describe("files", () => {
  afterEach(() => {
    const tmpDir = path.join(process.cwd(), "tmp");
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  describe("createTempDirectory", () => {
    test("should create a tmp directory if it does not exist", () => {
      const tmpDir = path.join(process.cwd(), "tmp");
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
      const result = createTempDirectory();
      expect(fs.existsSync(result)).toBe(true);
      expect(result).toBe(tmpDir);
    });

    test("should return the path to the tmp directory if it already exists", () => {
      const tmpDir = path.join(process.cwd(), "tmp");
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      const result = createTempDirectory();
      expect(fs.existsSync(result)).toBe(true);
      expect(result).toBe(tmpDir);
    });
  });

  describe("cleanupTempFiles", () => {
    test("should delete temporary PDF files", () => {
      const tmpDir = createTempDirectory();
      const tempFilePath = path.join(tmpDir, "temp.pdf");
      fs.writeFileSync(tempFilePath, "test");

      const pdfSources: PdfSource[] = [{ path: tempFilePath }];
      cleanupTempFiles(pdfSources, tmpDir);

      expect(fs.existsSync(tempFilePath)).toBe(false);
    });

    test("should not delete files outside the temp directory", () => {
      const tmpDir = createTempDirectory();
      const otherDir = path.join(process.cwd(), "other");
      if (!fs.existsSync(otherDir)) {
        fs.mkdirSync(otherDir, { recursive: true });
      }
      const otherFilePath = path.join(otherDir, "other.pdf");
      fs.writeFileSync(otherFilePath, "test");

      const pdfSources: PdfSource[] = [{ path: otherFilePath }];
      cleanupTempFiles(pdfSources, tmpDir);

      expect(fs.existsSync(otherFilePath)).toBe(true);
      fs.rmSync(otherDir, { recursive: true, force: true });
    });
  });
});
