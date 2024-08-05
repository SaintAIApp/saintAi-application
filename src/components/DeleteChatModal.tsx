import * as Dialog from "@radix-ui/react-dialog";

import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const contentVariants = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, },
};
const DeleteModal = ({ open, onOpenChange, onConfirm, fileId, setFileSeletedDelete }: any) => {

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button onClick={() => { setFileSeletedDelete(fileId); }} className="">
          <TrashIcon className='h-5 w-5 text-purple' />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <motion.div
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e] p-6 rounded-md max-w-sm w-full space-y-4">
            <Dialog.Title className="text-2xl text-white">Confirm Delete</Dialog.Title>
            <Dialog.Description className="text-lg text-white">
              Are you sure you want to delete this? This action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
            <Dialog.Close asChild>
              <button onClick={() => { setFileSeletedDelete(null); }} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                <XCircleIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </motion.div>

      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteModal;
