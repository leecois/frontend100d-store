import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const { brands, selectedBrand, selectBrand } = useStore();

  return (
    <div className="flex flex-col w-full">
      <h2 className="font-semibold text-xl mb-4">Brands</h2>
      <Button
        variant={selectedBrand === null ? "default" : "ghost"}
        className="justify-start mb-2"
        onClick={() => selectBrand(null)}
      >
        Show All
      </Button>
      {brands.map((brand) => (
        <Button
          key={brand._id}
          variant={selectedBrand === brand._id ? "default" : "ghost"}
          className="justify-between mb-2"
          onClick={() => selectBrand(brand._id)}
        >
          {brand.brandName}
          <span className="text-sm text-gray-500">{brand.watchCount}</span>
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
