import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";

export const UserProfile = () => {
  return (
    <Dropdown
      placement="bottom-end"
      offset={20}
      showArrow
      shadow="md"
      closeOnSelect={false}
    >
      <DropdownTrigger>
        <button
          className="flex gap-4 items-center mx-2"
          type="button"
          aria-label="Profile"
        >
          <Avatar
            isBordered
            showFallback
            className="bg-transparent w-6 h-6 text-tiny"
            src="images/avatar-placeholder.jpg"
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu variant="faded" aria-label="User profile">
        <DropdownItem
          key="profile"
          showDivider
          className="border-default cursor-default data-[hover=true]:bg-transparent data-[selectable=true]:focus:bg-transparent"
          classNames={{ base: "bg-emerald" }}
        >
          <User
            name="Junior Leo"
            description="jnrleo@geniustechspace.com"
            classNames={{
              // base: "bg-danger p-4",
              name: "font-semibold",
              description: "text-default-500",
            }}
            avatarProps={{
              size: "sm",
              src: "images/avatar-placeholder.jpg",
            }}
          />
        </DropdownItem>

        <DropdownItem
          key="settings"
          shortcut="⌘S"
          description="Update your account info"
          //   startContent={}
          classNames={{ title: "font-semibold" }}
        >
          Settings
        </DropdownItem>

        <DropdownItem
          key="copy"
          shortcut="⌘C"
          //   description="Copy the file link"
          // startContent={<CopyDocumentIcon className={iconClasses} />}
          classNames={{ title: "font-semibold" }}
        >
          Activities
        </DropdownItem>

        <DropdownItem
          showDivider
          key="notifications"
          shortcut="⌘N"
          // startContent={<EditDocumentIcon className={iconClasses} />}
          classNames={{ title: "font-semibold" }}
        >
          Notifications
        </DropdownItem>

        <DropdownSection className="mb-0">
          <DropdownItem
            color="danger"
            variant="solid"
            key="logout"
            classNames={{
              base: "bg-danger text-white",
              title: "text-center font-semibold",
            }}
          >
            Log out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
