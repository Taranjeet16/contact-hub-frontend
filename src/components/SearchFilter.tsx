import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_CATEGORIES, Contact } from "@/types/contact";
import { Search, Filter, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  contacts: Contact[];
}

function exportContactsToCSV(contacts: Contact[]) {
  if (contacts.length === 0) return;

  const headers = ["Name", "Email", "Phone", "Category", "Message", "Created At"];
  const getCategoryLabel = (value?: string) => {
    const cat = CONTACT_CATEGORIES.find((c) => c.value === value);
    return cat?.label || "";
  };

  const rows = contacts.map((contact) => [
    contact.name,
    contact.email,
    contact.phone,
    getCategoryLabel(contact.category),
    contact.message || "",
    contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  contacts,
}: SearchFilterProps) {
  const hasFilters = searchQuery || categoryFilter;

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("");
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Search Input - Full Width */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[140px] bg-background sm:w-[160px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Categories</SelectItem>
              {CONTACT_CATEGORIES.filter((c) => c.value).map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => exportContactsToCSV(contacts)}
          disabled={contacts.length === 0}
          className="gap-1.5 text-xs sm:gap-2 sm:text-sm"
        >
          <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Export</span> CSV
        </Button>

        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFilters}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
