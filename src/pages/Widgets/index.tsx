import CategorySelector from "../../components/CategorySelector";
import Generic1 from "./Generic1";
const index = () => {
  return (
    <div className="md:ml-10 mt-8 flex flex-col h-screen overflow-y-scroll">
      <div className="sticky px-3 top-0 bg-black z-50 w-full">
        <CategorySelector />
      </div>
      <div className="flex-1 mt-4">
        <Generic1 />
      </div>
    </div>

  );
};

export default index;
