import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ContactsTable } from "@/components/ContactsTable";
import { SearchFilter } from "@/components/SearchFilter";
import { useContacts } from "@/hooks/useContacts";
import { Contact, ContactFormData } from "@/types/contact";
import { BookUser } from "lucide-react";

const Index = () => {
  const {
    contacts,
    isLoading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
  } = useContacts();

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSubmit = async (data: ContactFormData): Promise<boolean> => {
    if (editingContact) {
      const success = await updateContact(editingContact._id, data);
      if (success) {
        setEditingContact(null);
      }
      return success;
    }
    return addContact(data);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4 sm:py-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-10 sm:w-10">
            <BookUser className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight sm:text-2xl">
              Contact Manager
            </h1>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Manage your contacts efficiently
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[380px_1fr] lg:gap-8 xl:grid-cols-[420px_1fr]">
          {/* Contact Form */}
          <div className="order-2 lg:sticky lg:top-24 lg:order-1 lg:self-start">
            <ContactForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              editingContact={editingContact}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* Contacts List */}
          <div className="order-1 space-y-4 lg:order-2">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={(val) => setCategoryFilter(val === "all" ? "" : val)}
              categories={categories}
              contacts={contacts}
            />
            <ContactsTable
              contacts={contacts}
              onDelete={deleteContact}
              onEdit={handleEdit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
