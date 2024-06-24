import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const { brands, selectedBrand, selectBrand } = useStore();

  return (
    <div className="flex flex-col w-full p-4">
      <h2 className="font-semibold text-xl mb-4">Brands</h2>
      <Button
        onClick={() => selectBrand(null)}
        className={`p-2 mb-2 w-full text-center rounded-lg ${
          selectedBrand === null ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
      >
        Show All
      </Button>
      {brands.map((brand) => (
        <Button
          key={brand._id}
          onClick={() => selectBrand(brand._id)}
          className={`p-2 mb-2 w-full text-center rounded-lg ${
            selectedBrand === brand._id
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          {brand.brandName}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
