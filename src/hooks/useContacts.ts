import { useState, useCallback, useMemo } from "react";
import { Contact, ContactFormData } from "@/types/contact";
import { contactApi } from "@/services/api";
import { toast } from "@/hooks/use-toast";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await contactApi.getContacts();
      setContacts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch contacts";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addContact = useCallback(async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const newContact = await contactApi.createContact(data);
      setContacts((prev) => [newContact, ...prev]);
      toast({
        title: "Success",
        description: "Contact added successfully!",
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add contact";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateContact = useCallback(async (id: string, data: ContactFormData) => {
    try {
      const updatedContact = await contactApi.updateContact(id, data);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? updatedContact : c))
      );
      toast({
        title: "Updated",
        description: "Contact updated successfully!",
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update contact";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    }
  }, []);

  const deleteContact = useCallback(async (id: string) => {
    try {
      await contactApi.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast({
        title: "Deleted",
        description: "Contact removed successfully.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete contact";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.includes(query);

      const matchesCategory =
        !categoryFilter || contact.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [contacts, searchQuery, categoryFilter]);

  const categories = useMemo(() => {
    const cats = new Set(contacts.map((c) => c.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [contacts]);

  return {
    contacts: filteredContacts,
    allContacts: contacts,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
  };
}
