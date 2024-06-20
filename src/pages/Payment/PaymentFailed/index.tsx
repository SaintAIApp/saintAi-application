import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";


const failed = () => {
  return (
    <section className=" h-[80vh] flex justify-center items-center flex-col">
    <div className="text-2xl  flex space-x-2 md:text-4xl text-red-500">
         <h1 className="   text-4xl">Payment Failed</h1>
          <MdCancel className="h-10 w-10"/>
      </div>
      <Link className="my-2 text-xl" to="/">Home</Link>
    </section>
  )
}

export default failed