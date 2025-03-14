import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";

@Injectable()
export class DatabaseService {
  get() {
    const data = readFileSync(this.getDbPath(), 'utf8');
    return JSON.parse(data);
  }

  save(data) {
    writeFileSync(this.getDbPath(), JSON.stringify(data));
  }

  private getDbPath() {
    return path.join(__dirname, 'data', 'db.json');
  }
}