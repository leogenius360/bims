import NextLink from "next/link";
import { ProductCard, ProductHeadline } from "@/components/product";

export default async function LandingPage() {

  const products = [
    {
      id: "1",
      name: "Hammer",
      description: "A useful tool for construction",
      price: 25.99,
      quantity: 50,
      imageUrl: "https://example.com/hammer.jpg",
    },
    {
      id: "2",
      name: "Screwdriver",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://example.com/screwdriver.jpg",
    },
    {
      id: "3",
      name: "Screwdriver",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://example.com/screwdriver.jpg",
    },
    {
      id: "4",
      name: "Screwdriver",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://example.com/screwdriver.jpg",
    },
  ];

  return (
    <>
      <ProductHeadline />

      <section className="grid items-center gap-4 px-3 pb-4 xs:grid-cols-2 sm:justify-between md:px-6 md:pb-8 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            imageUrl={product.imageUrl}
          />
        ))}
      </section>
    </>
  );
}
