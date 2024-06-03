import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User } from "@nextui-org/react"
import { ThemeSwitch } from "./theme-switch"

export const UserProfile = () => {
    return (
        <Dropdown placement="bottom-end" offset={20} showArrow shadow="md" closeOnSelect={false}>
            <DropdownTrigger>
                <button className="flex gap-4 items-center mx-2" type="button" aria-label="Profile">
                    <Avatar isBordered showFallback className="w-6 h-6 text-tiny"
                        src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
                </button>
            </DropdownTrigger>

            <DropdownMenu variant="faded" aria-label="User profile">
                <DropdownItem isReadOnly key="profile" className="h-14 gap-2">
                    <User name="Junior Leo" description="jnrleo@geniustechspace.com"
                        classNames={{
                            name: "text-default-600",
                            description: "text-default-500",
                        }}
                        avatarProps={{
                            size: "sm",
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                    />
                </DropdownItem>

                <DropdownItem
                    key="new"
                    shortcut="⌘N"
                    description="Create a new file"
                // startContent={<AddNoteIcon className={iconClasses} />}
                >
                    New file
                </DropdownItem>

                <DropdownItem
                    key="copy"
                    shortcut="⌘C"
                    description="Copy the file link"
                // startContent={<CopyDocumentIcon className={iconClasses} />}
                >
                    Copy link
                </DropdownItem>

                <DropdownItem
                    key="edit"
                    shortcut="⌘⇧E"
                    showDivider
                    description="Allows you to edit the file"
                // startContent={<EditDocumentIcon className={iconClasses} />}
                >
                    Edit file
                </DropdownItem>

                <DropdownSection className="mb-0">
                    <DropdownItem key="theme" isReadOnly className="cursor-default">
                        <ThemeSwitch />
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}