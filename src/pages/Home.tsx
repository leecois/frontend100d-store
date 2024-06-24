import { useEffect } from "react";
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
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

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

  useEffect(() => {
    setBrands();
    setWatches();
  }, [setBrands, setWatches]);

  return (
    <Wrapper className="flex flex-col items-center justify-center w-full">
      <div className="w-full flex justify-between items-center px-4 gap-4">
      <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by watch name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="max-w-[120px] h-12">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
        <Select value={order} onValueChange={setOrder}>
        <SelectTrigger className="max-w-[120px] h-12">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-6 w-full rounded-lg border bg-white shadow-sm"
      >
        <ResizablePanel minSize={10} defaultSize={15}>
          <div className="h-full p-4">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={85} defaultSize={75}>
          <div className="h-full overflow-auto p-4">
            <Watches />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Wrapper>
  );
};

export default Home;
