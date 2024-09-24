"use client"

import { Modal, ModalContent, Spinner } from "@nextui-org/react";


export default function GlobalLoading() {
	return (
        <Modal backdrop="opaque" isDismissable={false} placement="center" defaultOpen={true} hideCloseButton={true}>
            <ModalContent className="flex justify-center align-middle p-5 max-w-[12em]">
                <Spinner classNames={{wrapper:"pt-2"}} />
                <h3 className="text-center font-semibold mt-3">Loading ...</h3>
            </ModalContent>
        </Modal>
	);
}
