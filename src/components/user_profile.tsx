import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { internalUrls } from "@/config/site-config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/provider";

export const UserProfile = () => {
  const router = useRouter();

  const { user, logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    router.push(internalUrls.home);
  };

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
          className="mx-2 flex items-center gap-4 rounded-full"
          type="button"
          aria-label="Profile"
        >
          <Avatar
            isBordered
            showFallback
            className="h-6 w-6 bg-transparent text-tiny"
            src={
              user && user.photoURL
                ? user.photoURL
                : "images/avatar-placeholder.jpg"
            }
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu variant="faded" aria-label="User profile">
        <DropdownItem
          key="profile"
          showDivider
          className="cursor-default border-default data-[hover=true]:bg-transparent data-[selectable=true]:focus:bg-transparent"
          classNames={{ base: "bg-emerald" }}
        >
          <User
            name={user && user.displayName ? user.displayName : "Anonymous"}
            description={
              user && user.email
                ? user.email
                : `${user?.displayName}@serenity-bot.com`
            }
            classNames={{
              // base: "bg-danger p-4",
              name: "font-semibold",
              description: "text-default-500",
            }}
            avatarProps={{
              size: "sm",
              src:
                user && user.photoURL
                  ? user.photoURL
                  : "images/avatar-placeholder.jpg",
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
            onClick={handleLogOut}
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
