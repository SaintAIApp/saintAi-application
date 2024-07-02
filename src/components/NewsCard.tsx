import moment from "moment";
const index = ({
  title,
  description,
  image,
  date,
  type,

  url
}: {
  title: string;
  description: string;
  image: string;
  date: string;
  type: string;
  id:string;
  url:string
}) => {
  const getBg = ()=>{
    switch(type){
      case "crypto":
        return {bg:"#fff4a6",text:"#ad5b03"}
      case "stocks":
        return {bg:"#a4c7fc",text:"#0347ad"}
    }
    return {bg:"#a4c7fc",text:"#0347ad"}
  }

  return (
    <a
      href={url}
      target="_blank"
      className="flex flex-col   z-10 items-center overflow-hidden bg-dark border border-darkSecondary rounded-lg shadow md:flex-row md:max-w-xl "
    >
      <img
        className="object-cover w-full rounded-t-lg h-56 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
        src={image}
        alt="image"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
          {title}
        </h5>
        <div>
        <span className="px-2 py-0.5 text-sm w-fit rounded-full" style={{ borderColor:getBg().text, borderWidth:"0.7px", background:getBg().bg,color:getBg().text}}>{type}</span>
        <span className="text-slate-200 text-sm ml-4"> {moment(date).format("DD/MM/YYYY")}   </span>
        </div>
     
        <p className="mb-3 font-normal text-gray-200 ">{description && description.slice(0,50)+"..."}</p>
        <a href={url} target="_blank" className=" bg-dark text-primary w-fit px-5 py-1 rounded-md " style={{
          border:"0.7px solid rgb(54 151 102)"
        }}>Read More  </a>
      </div>
    </a>

  );
};

export default index;
