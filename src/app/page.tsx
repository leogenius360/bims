"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ProductCard } from "@/components/cards/product-card";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { Product } from "@/db/product";
import { Button, Pagination, Spinner } from "@nextui-org/react";
import { HomePageHeader } from "@/components/headers/homepage-header";
import { BaseUser } from "@/types/db";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/db/utils";

const LandingPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const itemsPerPage = 24; // Number of items per page
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true); // Start loading

        const [allProducts, allCategories] = await Promise.all([
          Product.getAll(),
          ProductCategory.getAll(),
        ]);

        setProducts(allProducts);
        setCategories(allCategories.map((cat) => cat.label));
      } catch (err) {
        setError("Failed to fetch products or categories.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const selectedCategoriesString = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // Filter products based on selected categories/tags and search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategoriesString
        ? selectedCategoriesString
            .toLowerCase()
            .includes(product.category.toLowerCase()) ||
          selectedCategoriesString
            .toLowerCase()
            .includes(product.name.toLowerCase())
        : true;

      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategoriesString, searchTerm]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length, itemsPerPage]);

  const refresh = useCallback(() => {
    setLoading(true);
    router.refresh();
  }, [router]);

  return (
    <>
      <HomePageHeader
        aria-label="Filter"
        user={user!}
        categories={categories}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        selectedValue={selectedCategoriesString}
        onSearchEnter={(e) => setSearchTerm(e.target.value)}
        searchValue={searchTerm}
      />

      {/* Display Loading Spinner if loading */}
      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <>
          {/* Display Paginated Products */}
          {products.length > 0 ? (
            <section className="grid items-center gap-4 px-3 pb-4 xs:grid-cols-2 sm:justify-between md:px-6 md:pb-8 xl:grid-cols-3 2xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  user={user!}
                  key={product.id}
                  product={
                    new Product(
                      {
                        name: product.name,
                        price: product.price,
                        stock: product.stock,
                        imageUrl: product.imageUrl,
                        category: product.category,
                        description: product.description,
                      },
                      user as BaseUser,
                    )
                  }
                  className="h-full w-full"
                />
              ))}
            </section>
          ) : (
            <div className="mx-auto my-12 flex w-full flex-col items-center justify-center text-center">
              <h6 className="py-2 text-xl font-bold uppercase">
                Unable to load products
              </h6>
              {/* Display Error Message if there's an error */}
              {/* {error && (
                  <div className="text-red-600">
                    <p>{error}</p>
                  </div>
                )} */}
              <p className="leading-12 text-sm font-semibold">
                Make sure you have internet connection and <br />
                <span
                  onClick={refresh}
                  className="inline-block cursor-pointer py-1 text-primary"
                >
                  Try reloading
                </span>
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex items-center justify-end px-6 py-4">
              <Pagination
                size="sm"
                isCompact
                showControls
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default withLoginRequired(LandingPage);
