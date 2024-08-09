"use client";

import { useState, useEffect, useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { InventoryMethod, Product } from "@/db/product";
import { Button, Spinner } from "@nextui-org/react";
import { ProductHeadline } from "@/components/product-headline";

const LandingPage = () => {
  const { user } = useAuth();

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const itemsPerPage = 8; // Number of items per page
  const categories = ["Massonary", "Roofing", "Carpentry"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const allProducts = await Product.getAll();
        setProducts(allProducts);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // Filter products based on selected categories/tags and search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedValue
        ? selectedValue
            .toLowerCase()
            .includes(product.category.toLowerCase()) ||
          selectedValue.toLowerCase().includes(product.name.toLowerCase())
        : true;

      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedValue, searchTerm]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <>
      <div className="">
        <ProductHeadline
          user={user!}
          tags={["Screwdriver"]}
          categories={categories}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          selectedValue={selectedValue}
          onSearchEnter={(e) => setSearchTerm(e.target.value)}
          searchValue={searchTerm}
        />

        {/* Display Error Message if there's an error */}
        {error && (
          <div className="px-6 py-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Display Loading Spinner if loading */}
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Spinner color="primary" size="lg" />
          </div>
        ) : (
          <>
            {/* Display Paginated Products */}
            <section className="grid items-center gap-4 px-3 pb-4 xs:grid-cols-2 sm:justify-between md:px-6 md:pb-8 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  user={user!}
                  key={product.id}
                  product={
                    new Product(
                      {
                        name: product.name,
                        imageUrl: product.imageUrl,
                        category: product.category,
                        inventoryMethod: InventoryMethod.FIFO,
                        description: product.description,
                      },
                      user!,
                    )
                  }
                  filter={selectedValue}
                  className="h-full w-full"
                />
              ))}
            </section>

            {/* Pagination Controls */}
            {/* <div className="flex items-center justify-between px-6 py-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredProducts.length / itemsPerPage)}
              </span>
              <Button
                disabled={
                  currentPage ===
                  Math.ceil(filteredProducts.length / itemsPerPage)
                }
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default withLoginRequired(LandingPage);
