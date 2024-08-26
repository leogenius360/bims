"use client";

import { useState, FormEvent } from "react";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useAuth } from "@/auth/provider";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  Sales,
  SalesProps,
  SalesProductProps,
  PaymentStatus,
} from "@/db/sales";
import { BaseUser } from "@/types/db";
import { Divider } from "..";
import { Disclosure } from "@/types";
import { MdEditNote } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { useCart } from "@/cart/provider";

interface StockFormProps {
  salesModal?: Disclosure;
}

export const SalesForm = ({ salesModal }: StockFormProps) => {
  const { user } = useAuth();
  const { cart, getTotalCost, clearCart } = useCart();

  const router = useRouter();
  const [formData, setFormData] = useState<SalesProps>({
    products: cart,
    payment: {},
    customer: { name: "" },
    delivery: { status: "instant take off" },
    description: "",
  });
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "payment.amountPaid" || name === "expenses"
          ? parseFloat(value)
          : value,
    });
  };

  const handleCustomerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      customer: {
        ...prevFormData.customer,
        [e.target.name.split(".")[1]]: e.target.value,
      },
    }));
  };

  const handleDeliveryInputChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      delivery: {
        ...prevFormData.delivery,
        status: value,
      },
    }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payment: {
        ...prevFormData.payment,
        [e.target.name.split(".")[1]]: parseFloat(e.target.value),
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setErrors("");

    formData.products = cart;

    // Ensure the products array is not empty
    if (!formData.products || formData.products.length === 0) {
      setErrors("No products in the stock cart!");
      setLoading(false);
      return;
    }

    // Validate product prices
    if (formData.products.some((p) => p.price <= 0)) {
      setErrors("Please make sure each product price is set!");
      setLoading(false);
      return;
    }

    // Validate customer name
    if (!formData.customer.name) {
      setErrors("Please make sure the customer's name is not empty!");
      setLoading(false);
      return;
    }

    // Validate payment amount
    if (
      formData.payment?.amountPaid &&
      formData.payment?.amountPaid > getTotalCost()
    ) {
      setErrors("Amount paid cannot exceed total cost!");
      setLoading(false);
      return;
    }

    try {
      const stock = new Sales({ ...formData }, user as BaseUser);
      await stock.save();
      setLoading(false);
      clearCart();
      setFormData({
        products: cart,
        payment: {},
        customer: { name: "" },
        delivery: { status: "instant take off" },
        description: "",
      });
      salesModal?.onClose();
      router.refresh();
    } catch (e) {
      const error = e as FirebaseError;
      console.error("Save error: ", error);
      setErrors(error.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      size="xl"
      scrollBehavior="inside"
      isOpen={salesModal?.isOpen}
      onOpenChange={salesModal?.onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="py-2 text-sm">
              Sales checkout form
            </ModalHeader>
            <ModalBody className="custom-scrollbar">
              <div className="flex flex-wrap gap-1">
                {cart.map((product) => (
                  <Chip key={product.id} variant="flat" size="sm">
                    {product.name} : {product.qty} @ {product.price}
                  </Chip>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="">
                {errors && (
                  <p className="pb-3 text-center text-sm font-semibold text-danger">
                    {errors}
                  </p>
                )}
                <div className="card rounded-md px-4 py-3">
                  <div className="mb-3 flex justify-between">
                    <h4 className="text-xs font-bold">
                      Number of products: {cart.length}
                    </h4>
                    <h4 className="pe-1 text-xs font-bold">
                      Total cost: {getTotalCost().toFixed(2)}
                    </h4>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        label={
                          <span className="text-gray-800 dark:text-gray-300">
                            Payment made
                          </span>
                        }
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        name="payment.amountPaid"
                        value={formData.payment?.amountPaid?.toString()}
                        onChange={handlePaymentInputChange}
                        classNames={{
                          mainWrapper: "mt-3",
                          inputWrapper:
                            "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        }}
                      />
                      <Input
                        type="number"
                        label={
                          <span className="text-gray-800 dark:text-gray-300">
                            Expenses
                          </span>
                        }
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        name="expenses"
                        value={formData.expenses?.toString()}
                        onChange={handleInputChange}
                        classNames={{
                          mainWrapper: "mt-3",
                          inputWrapper:
                            "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        }}
                      />
                    </div>

                    <div className="mt-6 w-full">
                      <label className="mb-2 block text-xs font-bold">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="description"
                        className="card w-full rounded-md border-2 border-primary px-3 py-2 outline-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Divider textContent="Customer details" />
                    <Input
                      label={
                        <span className="text-gray-800 dark:text-gray-300">
                          Customer name
                        </span>
                      }
                      type="text"
                      name="customer.name"
                      value={formData.customer.name}
                      onChange={handleCustomerInputChange}
                      labelPlacement="outside"
                      radius="sm"
                      color="primary"
                      variant="bordered"
                      classNames={{
                        mainWrapper: "mt-3",
                        inputWrapper:
                          "border-emerald-700 data-[hover=true]:border-primary font-bold",
                      }}
                    />

                    <div className="my-3 flex items-center gap-3">
                      <Input
                        label={
                          <span className="text-gray-800 dark:text-gray-300">
                            Email
                          </span>
                        }
                        type="email"
                        name="customer.email"
                        value={formData.customer.email}
                        onChange={handleCustomerInputChange}
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        classNames={{
                          inputWrapper:
                            "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        }}
                      />

                      <Input
                        label={
                          <span className="text-gray-800 dark:text-gray-300">
                            Contact
                          </span>
                        }
                        type="text"
                        name="customer.contact"
                        value={formData.customer.contact}
                        onChange={handleCustomerInputChange}
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        classNames={{
                          inputWrapper:
                            "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        }}
                      />
                    </div>

                    <Input
                      label={
                        <span className="text-gray-800 dark:text-gray-300">
                          Address
                        </span>
                      }
                      type="text"
                      name="customer.address"
                      // value={formData.customer.address}
                      // onChange={handleCustomerInputChange}
                      labelPlacement="outside"
                      radius="sm"
                      color="primary"
                      variant="bordered"
                      classNames={{
                        mainWrapper: "mt-4",
                        inputWrapper:
                          "border-emerald-700 data-[hover=true]:border-primary font-bold",
                      }}
                    />
                  </div>

                  <div className="pt-6">
                    <Divider textContent="Delivery details" />
                    <Input
                      label={
                        <span className="text-gray-800 dark:text-gray-300">
                          Delivery user
                        </span>
                      }
                      type="text"
                      name="customer.name"
                      value={
                        formData.delivery?.user?.displayName ||
                        formData.delivery?.user?.email
                      }
                      onChange={(e) =>
                        setFormData((data) => {
                          return {
                            ...data,
                            delivery: {
                              user: { displayName: e.target.value, email: "" },
                            },
                          };
                        })
                      }
                      labelPlacement="outside"
                      radius="sm"
                      color="primary"
                      variant="bordered"
                      classNames={{
                        mainWrapper: "mt-3",
                        inputWrapper:
                          "border-emerald-700 data-[hover=true]:border-primary font-bold",
                      }}
                    />

                    <RadioGroup
                      label={
                        <span className="text-gray-800 dark:text-gray-300">
                          Select delivery status
                        </span>
                      }
                      orientation="horizontal"
                      value={formData.delivery?.status}
                      onValueChange={handleDeliveryInputChange}
                      className="my-6 pe-1"
                      classNames={{
                        wrapper: "justify-between",
                        label: "my-2",
                      }}
                    >
                      <Radio value="instant take off">Instant take off</Radio>
                      <Radio value="delivered">Delivered</Radio>
                      <Radio value="delivering">Delivering</Radio>
                      <Radio value="pending">Pending</Radio>
                    </RadioGroup>
                  </div>
                  {errors && (
                    <p className="text-center text-sm font-semibold text-danger">
                      {errors}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex w-full items-center gap-3">
                  <Button
                    type="submit"
                    radius="sm"
                    color="primary"
                    variant="solid"
                    className="w-full"
                    isLoading={loading}
                  >
                    Submit
                  </Button>

                  <Button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#updateCartForm"
                    aria-controls="updateCartForm"
                    radius="sm"
                    color="primary"
                    variant="solid"
                    onPress={salesModal?.onClose}
                    className="w-full gap-1 hover:gap-2"
                    endContent={<FiChevronRight size={16} />}
                  >
                    Edit cart
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter className="py-3"></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// export const SalesForm = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [formData, setFormData] = useState<SalesProps>({
//     products: [],
//     payment: { amountPaid: 0, balance: 0, status: PaymentStatus.PartPayment },
//     expenses: 0,
//     description: "",
//   });
//   const [errors, setErrors] = useState<string>("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const updatedProducts = [...formData.products];
//     updatedProducts[index] = {
//       ...updatedProducts[index],
//       [e.target.name]: e.target.name === "qty" || e.target.name === "price" ? Number(e.target.value) : e.target.value,
//     };
//     setFormData({ ...formData, products: updatedProducts });
//   };

//   const handleAddProduct = () => {
//     setFormData({
//       ...formData,
//       products: [...formData.products, { id: "", name: "", price: 0, qty: 0 }],
//     });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setErrors("");

//     try {
//       const sales = new Sales({ ...formData }, user as BaseUser);
//       await sales.save();
//       // router.push("/sales"); // Redirect to the sales list page after saving
//     } catch (e) {
//       const error = e as FirebaseError;
//       console.error("Save error: ", error);
//       setErrors(error.message);
//     }
//   };

//   return (
//     <div
//       className="offcanvas offcanvas-end w-screen border-primary md:max-w-96"
//       data-bs-scroll="false"
//       id="newSalesForm"
//       aria-labelledby="newSalesFormLabel"
//     >
//       <div className="offcanvas-header">
//         <h6 className="offcanvas-title font-bold" id="newSalesFormLabel">
//           New Sale
//         </h6>
//         <button
//           className="btn-close"
//           type="button"
//           data-bs-dismiss="offcanvas"
//           aria-label="Close"
//         ></button>
//         <hr />
//       </div>

//       <div className="offcanvas-body">
//         <form onSubmit={handleSubmit} className="mt-3">
//           {errors && (
//             <p className="pb-3 text-center text-sm font-semibold text-danger">
//               {errors}
//             </p>
//           )}

//           <div className="mb-3">
//             <label className="mb-2 block text-xs font-bold">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//               placeholder="Enter sale description"
//               className="w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           {formData.products.map((product, index) => (
//             <div key={index} className="mb-3">
//               <h5 className="font-bold">Product {index + 1}</h5>
//               <div className="mb-3">
//                 <label className="mb-2 block text-xs font-bold">Product ID</label>
//                 <input
//                   type="text"
//                   name="id"
//                   value={product.id}
//                   onChange={(e) => handleProductChange(index, e)}
//                   required
//                   placeholder="Enter product ID"
//                   className="w-full rounded-md border px-3 py-2"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="mb-2 block text-xs font-bold">Product Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={product.name}
//                   onChange={(e) => handleProductChange(index, e)}
//                   required
//                   placeholder="Enter product name"
//                   className="w-full rounded-md border px-3 py-2"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="mb-2 block text-xs font-bold">Quantity</label>
//                 <input
//                   type="number"
//                   name="qty"
//                   value={product.qty}
//                   onChange={(e) => handleProductChange(index, e)}
//                   required
//                   placeholder="Enter quantity"
//                   className="w-full rounded-md border px-3 py-2"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="mb-2 block text-xs font-bold">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={product.price}
//                   onChange={(e) => handleProductChange(index, e)}
//                   required
//                   placeholder="Enter price"
//                   className="w-full rounded-md border px-3 py-2"
//                 />
//               </div>
//             </div>
//           ))}

//           <Button
//             type="button"
//             size="sm"
//             color="primary"
//             variant="solid"
//             onClick={handleAddProduct}
//             className="mt-3 w-full"
//           >
//             Add Another Product
//           </Button>

//           <Button
//             type="submit"
//             size="sm"
//             color="primary"
//             variant="solid"
//             className="mt-3 w-full"
//           >
//             Save
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };
