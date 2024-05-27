import Button from "./Button";
type Props = {
  number: string;
  heading: string;
  description: string;
  className?: string;
};
const MissionCard: React.FC<Props> = ({ number, heading, description, className = "" }) => {
  return (
    <div className={`border-[0.8px] border-purple_dark bg-opacity-40 bg-purple px-4 py-3 rounded-3xl md:w-60 lg:w-80 hover:shadow-inner hover:shadow-purple_dark duration-500 ${className}`}>
      <h1 className="text-primary text-6xl font-bold mb-4">{number}</h1>
      <h1 className="text-4xl mb-10">{heading}</h1>
      <h1 className="mb-32 line-clamp-3">{description}</h1>
      <Button className="" text="Saint App" variant="rounded" onClick={() => {}} />
    </div>
  );
};

export default MissionCard;
