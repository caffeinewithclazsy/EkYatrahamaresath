"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
let db = null;
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db) {
            db = yield (0, sqlite_1.open)({
                filename: './mydatabase.sqlite',
                driver: sqlite3_1.default.Database
            });
            yield db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      );

      CREATE TABLE IF NOT EXISTS packages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        destination TEXT NOT NULL,
        duration TEXT NOT NULL,
        price REAL NOT NULL,
        originalPrice REAL,
        rating REAL,
        reviews INTEGER,
        image TEXT,
        description TEXT,
        highlights TEXT,
        inclusions TEXT,
        exclusions TEXT,
        itinerary TEXT,
        category TEXT,
        availableDates TEXT
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        packageId TEXT NOT NULL,
        userId TEXT NOT NULL,
        travelers INTEGER NOT NULL,
        startDate TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        bookingDate TEXT NOT NULL,
        FOREIGN KEY (packageId) REFERENCES packages (id),
        FOREIGN KEY (userId) REFERENCES users (id)
      );
    `);
        }
        return db;
    });
}
