import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Wrapper from "@/components/wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/side-bar";
import Watches from "@/components/watches";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";

const Home = () => {
  const {
    setBrands,
    setWatches,
    query,
    setQuery,
    sort,
    setSort,
    order,
    setOrder,
  } = useStore();
  const [searchTerm, setSearchTerm] = useState(query);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setBrands();
    setWatches();
  }, [setBrands, setWatches]);

  useEffect(() => {
    setQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Wrapper className="flex flex-col items-center justify-center w-full">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by watch name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-md"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
          <Select value={order} onValueChange={setOrder}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg border bg-background shadow-sm"
      >
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto p-4">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto p-4">
            <Watches />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Wrapper>
  );
};

export default Home;