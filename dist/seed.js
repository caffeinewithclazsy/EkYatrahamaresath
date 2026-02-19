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
const database_1 = require("./database");
const mock_data_1 = require("./mock-data");
const bcrypt_1 = __importDefault(require("bcrypt"));
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.initializeDatabase)();
        // Seed users
        for (const user of mock_data_1.mockUsers) {
            const hashedPassword = yield bcrypt_1.default.hash('password', 10); // Using a default password for all mock users
            yield db.run('INSERT OR IGNORE INTO users (id, name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)', user.id, user.name, user.email, user.phone, hashedPassword, user.role);
        }
        // Seed packages
        for (const pkg of mock_data_1.mockPackages) {
            yield db.run('INSERT OR IGNORE INTO packages (id, name, destination, duration, price, originalPrice, rating, reviews, image, description, highlights, inclusions, exclusions, itinerary, category, availableDates) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', pkg.id, pkg.name, pkg.destination, pkg.duration, pkg.price, pkg.originalPrice, pkg.rating, pkg.reviews, pkg.image, pkg.description, JSON.stringify(pkg.highlights), JSON.stringify(pkg.inclusions), JSON.stringify(pkg.exclusions), JSON.stringify(pkg.itinerary), pkg.category, JSON.stringify(pkg.availableDates));
        }
        // Seed bookings
        for (const booking of mock_data_1.mockBookings) {
            yield db.run('INSERT OR IGNORE INTO bookings (id, packageId, userId, travelers, startDate, totalPrice, status, bookingDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', booking.id, booking.packageId, booking.userId, booking.travelers, booking.startDate, booking.totalPrice, booking.status, booking.bookingDate);
        }
        console.log('Database seeded successfully!');
        yield db.close();
    });
}
seedDatabase().catch(error => {
    console.error('Failed to seed database:', error);
});
