// import React from "react";
// import * as Select from "@radix-ui/react-select";
// import classnames from "classnames";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   CheckIcon,
// } from "@heroicons/react/24/outline";
// // import "./styles.css";

// const DropDown = ({
//   list,
//   label,
//   onChange,
// }: {
//   list: string[];
//   label: string;
//   onChange: (val:string) => void;
// }) => (
//   <Select.Root onValueChange={onChange}>
//     <Select.Trigger className="flex w-full items-center justify-center rounded px-4 py-2 text-sm leading-none h-9 gap-1 bg-white text-violet-900 shadow-md hover:bg-slate-300 focus:shadow-outline-black" aria-label={label}>
//       <Select.Value placeholder="Select file type" />
//       <Select.Icon className="text-purple">
//         <ChevronDownIcon height={20} width={20} />
//       </Select.Icon>
//     </Select.Trigger>
//     <Select.Portal>
//       <Select.Content className=" bg-white rounded-md shadow-lg w-full">
//         <Select.ScrollUpButton className="flex items-center w-full justify-center h-6 bg-white text-violet-900 cursor-default">
//           <ChevronUpIcon height={20} width={20} />
//         </Select.ScrollUpButton>
//         <Select.Viewport className=" w-full p-1.5">
//           <Select.Group>
//             <Select.Label className="px-6 text-xs leading-6 text-black w-full">{label}</Select.Label>
//             {list.map((item, key) => (
//               <SelectItem key={key} value={item} />
//             ))}
//           </Select.Group>

//         </Select.Viewport>
//         <Select.ScrollDownButton className="flex  w-full items-center justify-center h-6 bg-white text-violet-900 cursor-default">
//           <ChevronDownIcon height={20} width={20}/>
//         </Select.ScrollDownButton>
//       </Select.Content>
//     </Select.Portal>
//   </Select.Root>
// );

// const SelectItem = React.forwardRef(
//   (
//     {
//       children,
//       className,
//       value,
//       disabled,
//       ...props
//     }: { children?: any; className?: string; value: string,disabled?:boolean},
//     forwardedRef: any
//   ) => {
//     return (
//       <Select.Item
//         {...props}
//         value={value}
//         className={`relative w-full flex items-center h-6 px-9 text-sm leading-none text-violet-900 rounded-md select-none ${className} hover:bg-violet-600 hover:text-white`}
//         ref={forwardedRef}
//       >
//         <Select.ItemText>{value}</Select.ItemText>
//         <Select.ItemIndicator className="absolute w-full left-0  flex items-center justify-center">
//           <CheckIcon />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   }
// );

// export default DropDown;
