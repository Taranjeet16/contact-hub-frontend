import { Contact, ContactFormData } from "@/types/contact";

// TODO: Update this to your Express backend URL
const API_BASE_URL = "http://localhost:5000/api";

export const contactApi = {
  // GET all contacts
  async getContacts(): Promise<Contact[]> {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    return response.json();
  },

  // POST new contact
  async createContact(data: ContactFormData): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create contact");
    }
    return response.json();
  },

  // PUT update contact
  async updateContact(id: string, data: ContactFormData): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update contact");
    }
    return response.json();
  },

  // DELETE contact
  async deleteContact(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
  },
};
