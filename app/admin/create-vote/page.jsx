import CreateVote from "@/app/components/create";
import UniqueNumber from "@/app/components/generateUniqueNumber";
import Navbar from "@/app/components/navbar";

const Page = () => {
  return (
    <div>
      <Navbar title="Create Vote" />
      <div className="flex  justify-between md:flex-row flex-col gap-2 mt-10">
        <div className="">
          <CreateVote />
        </div>
        <div className="">
          <UniqueNumber />
        </div>
      </div>
    </div>
  );
};

export default Page;
