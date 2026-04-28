import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export interface BookingData {
  name: string;
  phone: string;
  service: string;
  serviceCategory: string;
  date: string;
  time: string;
  totalPrice: number;
  downPayment: number;
  receiptURL: string;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
}

export async function uploadReceipt(file: File, bookingId: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `receipts/${bookingId}_${Date.now()}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function saveBooking(data: BookingData): Promise<string> {
  const docRef = await addDoc(collection(db, "bookings"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export const SERVICES = {
  "Gel Polish": {
    icon: "💅",
    description: "Long-lasting gel nail color",
    variants: [
      { name: "Plain", price: 300 },
      { name: "Minimal", price: 400 },
      { name: "Accent", price: 500 },
      { name: "Advance", price: 600 },
    ],
  },
  "Softgel Extension": {
    icon: "✨",
    description: "Natural-looking nail extensions",
    variants: [
      { name: "Plain", price: 350 },
      { name: "Minimal", price: 450 },
      { name: "Accent", price: 550 },
      { name: "Advance", price: 650 },
    ],
  },
  Removals: {
    icon: "🌸",
    description: "Safe and gentle nail removal",
    variants: [
      { name: "Gel Polish (standalone)", price: 80 },
      { name: "Gel Polish (with no set)", price: 110 },
      { name: "Softgel X (standalone)", price: 150 },
      { name: "Softgel X (with no set)", price: 190 },
      { name: "Not My Work (standalone)", price: 180 },
      { name: "Not My Work (with no set)", price: 220 },
    ],
  },
} as const;

export const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export const DOWN_PAYMENT = 50;
