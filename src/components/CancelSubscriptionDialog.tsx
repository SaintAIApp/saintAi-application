import * as Dialog from "@radix-ui/react-dialog";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Button from "./Button";

const contentVariants = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, },
};
const CancelSubscriptionDialog = ({ open, onOpenChange, onConfirm }: any) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button variant="primary" className="bg-purple text-white py-2 px-3 rounded-xl mt-4" text={"Cancel subscription"} />
      </Dialog.Trigger>
      <Dialog.Portal>

        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <motion.div
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e] p-3 md:p-6 rounded-md max-w-sm w-[90%] space-y-4 md:mx-0 ">
            <Dialog.Title className=" text-lg md:text-2xl text-white">Cancel subscription?</Dialog.Title>
            <Dialog.Description className=" text-md md:text-lg text-white">
              Are you sure you want to cancel your subscription? This action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button className="md:px-4 md:py-2 px-2 py-1 bg-gray-600 text-white rounded-md">
                  Back
                </button>
              </Dialog.Close>
              <button
                onClick={onConfirm}
                className="md:px-4 md:py-2 px-2 py-1 bg-red-600 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                <XCircleIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </motion.div>

      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CancelSubscriptionDialog;
