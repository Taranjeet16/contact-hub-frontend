export const CONTACT_CATEGORIES = [
  { value: "", label: "No Category" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
] as const;

export type ContactCategory = typeof CONTACT_CATEGORIES[number]["value"];

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  category?: string;
  createdAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  category: string;
}
