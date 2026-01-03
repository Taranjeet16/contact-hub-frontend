import { Contact, CONTACT_CATEGORIES } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Trash2, ArrowUpDown, Mail, Phone, Pencil } from "lucide-react";
import { useState } from "react";

interface ContactsTableProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onEdit: (contact: Contact) => void;
  isLoading?: boolean;
}

type SortField = "name" | "email" | "category" | "createdAt";
type SortOrder = "asc" | "desc";

export function ContactsTable({
  contacts,
  onDelete,
  onEdit,
  isLoading,
}: ContactsTableProps) {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const aValue = a[sortField] || "";
    const bValue = b[sortField] || "";
    const comparison = aValue.localeCompare(bValue);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const getCategoryLabel = (value?: string) => {
    if (!value) return null;
    const cat = CONTACT_CATEGORIES.find((c) => c.value === value);
    return cat?.label || value;
  };

  const getCategoryColor = (value?: string) => {
    const colors: Record<string, string> = {
      work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      personal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      family: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      friends: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      business: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    };
    return colors[value || ""] || colors.other;
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="px-4 pb-3 sm:px-6 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
          <Users className="h-5 w-5 text-primary" />
          Contacts
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Users className="mb-4 h-12 w-12 opacity-50" />
            <p className="text-lg font-medium">No contacts found</p>
            <p className="text-sm">Add a contact or adjust your search filters</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="space-y-3 md:hidden">
              {sortedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="rounded-lg border border-border/50 bg-background/50 p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{contact.name}</p>
                      {contact.category && (
                        <Badge
                          variant="secondary"
                          className={`mt-1 ${getCategoryColor(contact.category)}`}
                        >
                          {getCategoryLabel(contact.category)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(contact)}
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(contact._id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{contact.email}</span>
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      {contact.phone}
                    </a>
                    {contact.message && (
                      <p className="line-clamp-2 pt-1 text-muted-foreground">
                        {contact.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto md:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("name")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Name
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("email")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Email
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("category")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Category
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">Message</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedContacts.map((contact) => (
                    <TableRow key={contact._id} className="group">
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </a>
                      </TableCell>
                      <TableCell>
                        {contact.category ? (
                          <Badge
                            variant="secondary"
                            className={getCategoryColor(contact.category)}
                          >
                            {getCategoryLabel(contact.category)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden max-w-[200px] truncate lg:table-cell">
                        {contact.message || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(contact)}
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(contact._id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
