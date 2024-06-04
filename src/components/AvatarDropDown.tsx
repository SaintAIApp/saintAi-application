import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";

const AvatarDropDown = ({ triggerButton }: { triggerButton: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {triggerButton}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[220px] z-[100] bg-white rounded-md p-1 shadow-custom animate-custom">
          <DropdownMenu.Label className="px-2 py-1 text-gray-600 font-semibold">
            Account
          </DropdownMenu.Label>

          <DropdownMenu.Separator className="border-t border-gray-200 my-1" />

          <DropdownMenu.Item className="px-2 py-1 cursor-pointer hover:bg-gray-100">
            {user?.username}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="px-2 py-1 cursor-pointer hover:bg-gray-100">
            {user?.email}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="border-t border-gray-200 my-1" />

          <DropdownMenu.Item className="px-2 py-1 cursor-pointer text-red-500 hover:bg-red-100">
            <button onClick={handleLogout}>Logout</button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AvatarDropDown;
