export const ContactUsForm = () => {
    return (
      <div className="relative overflow-hidden border-[1.8px] p-10 rounded-3xl border-purple_dark bg-purple bg-opacity-70 place-content-between">
        <div className="absolute h-full w-full inset-0 flex">
          <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90 bg-blur"></div>
          <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
          <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
          <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
        </div>
        <form action="" className="w-full flex flex-col z-20">
          <h1 className="text-3xl mb-4 z-20">Contact Us</h1>
          <div className="flex w-full space-x-4 my-2">
            <div className="w-1/2">
              <input
                type="text"
                className="w-full rounded-lg border-[0.7px] border-purple_dark px-4 py-4 bg-purple z-10 relative"
                placeholder="Your Name"
              />
            </div>
            <input
              type="text"
              className="w-1/2 rounded-lg text-white  px-4 py-4 border-[0.7px] border-purple_dark bg-purple z-10 relative"
              placeholder="Your Email"
            />
          </div>
          <textarea
            className="bg-purple rounded-lg z-10 relative border-[0.7px] text-white  border-purple_dark p-4"
            name=""
            placeholder="Tell us about your business or leave a question"
            rows={10}
            cols={10}
            id=""
          ></textarea>
          <button className="my-2  bg-purple_dark text-center   py-4 rounded-lg z-10 relative">
            Contact Now
          </button>
        </form>
      </div>
    );
  };
  