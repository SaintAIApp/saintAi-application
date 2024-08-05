import CategorySelector from "../../components/CategorySelector";
import Generic1 from "./Generic1";
const index = () => {
  return (
    <div className="md:ml-10 overflow-y-hidden mt-8 flex flex-col h-screen">
      <div className="sticky top-0 bg-black z-10 w-fit">
        <CategorySelector />
      </div>
      <div className="flex-1 overflow-y-auto mt-4">
        <Generic1 />
      </div>
    </div>
  );
};

export default index;
