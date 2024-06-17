import Wrapper from "@/components/wrapper";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const Home = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center">
      <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel minSize={15} defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={75} defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
   </Wrapper>
  );
};

export default Home;
