'use client'
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SortAsc, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddProductDialog from "./components/Dialog/add";
import { useProductContext } from "./components/context";
import { motion, AnimatePresence } from "framer-motion";

// Dummy product data
const productsData = [
    {
        id: 1,
        name: "Wireless Headphones",
        image: "https://picsum.photos/400/300?random=1",
        price: 99.99,
        status: "Active",
        shortDescription: "High-quality wireless headphones with noise cancellation.",
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        image: "https://picsum.photos/400/300?random=2",
        price: 149.99,
        status: "Active",
        shortDescription: "Track your fitness and health with this smart watch.",
    },
    {
        id: 3,
        name: "Portable Speaker",
        image: "https://picsum.photos/400/300?random=3",
        price: 59.99,
        status: "Inactive",
        shortDescription: "Compact speaker with powerful sound for music on the go.",
    },
    {
        id: 4,
        name: "Eco-Friendly Water Bottle",
        image: "https://picsum.photos/400/300?random=4",
        price: 24.99,
        status: "Active",
        shortDescription: "Reusable water bottle made from eco-friendly materials.",
    },
    {
        id: 5,
        name: "Bluetooth Keyboard",
        image: "https://picsum.photos/400/300?random=5",
        price: 39.99,
        status: "Out of Stock",
        shortDescription: "Slim Bluetooth keyboard compatible with all devices.",
    },
    {
        id: 6,
        name: "Smart LED Lamp",
        image: "https://picsum.photos/400/300?random=6",
        price: 29.99,
        status: "Active",
        shortDescription: "Adjustable LED lamp with smart controls and color modes.",
    },
    {
        id: 7,
        name: "Noise Cancelling Earbuds",
        image: "https://picsum.photos/400/300?random=7",
        price: 79.99,
        status: "Inactive",
        shortDescription: "Wireless earbuds with active noise cancellation.",
    },
    {
        id: 8,
        name: "E-Reader",
        image: "https://picsum.photos/400/300?random=8",
        price: 119.99,
        status: "Active",
        shortDescription: "Lightweight e-reader with high-resolution display.",
    },
    {
        id: 9,
        name: "Laptop Stand",
        image: "https://picsum.photos/400/300?random=9",
        price: 34.99,
        status: "Active",
        shortDescription: "Ergonomic laptop stand for better posture.",
    },
    {
        id: 10,
        name: "Portable Power Bank",
        image: "https://picsum.photos/400/300?random=10",
        price: 44.99,
        status: "Out of Stock",
        shortDescription: "High-capacity power bank for charging on the go.",
    },
];

// Animation variants
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.18 } },
};

// SearchBar Component
function ProductSearchBar({ search, setSearch }: { search: string, setSearch: (v: string) => void }) {
    return (
        <div className="flex-1">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search className="h-5 w-5" />
                </span>
            </div>
        </div>
    );
}

// Sort Dropdown Component
function SortByDropdown({ sortBy, setSortBy }: { sortBy: string, setSortBy: (v: string) => void }) {
    return (
        <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="status">Status</SelectItem>
            </SelectContent>
        </Select>
    );
}

// Status Filter Dropdown Component
function StatusFilterDropdown({ status, setStatus }: { status: string, setStatus: (v: string) => void }) {
    // Use a non-empty value for "All Statuses" (e.g., "all") to avoid the error
    return (
        <Select
            value={status === "" ? "all" : status}
            onValueChange={v => setStatus(v === "all" ? "" : v)}
        >
            <SelectTrigger className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
        </Select>
    );
}

// Filters Row Component
function ProductFilters({
    search,
    setSearch,
    sortBy,
    setSortBy,
    status,
    setStatus,
}: {
    search: string,
    setSearch: (v: string) => void,
    sortBy: string,
    setSortBy: (v: string) => void,
    status: string,
    setStatus: (v: string) => void,
}) {
    const { setIsAddProductDialogOpen } = useProductContext();
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 my-6"
        >
            {/* Search Bar */}
            <ProductSearchBar search={search} setSearch={setSearch} />
            {/* Filters */}
            <div className="flex gap-4">
                <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
                <StatusFilterDropdown status={status} setStatus={setStatus} />
                <Button onClick={() => setIsAddProductDialogOpen(true)} className="flex items-center gap-2">
                    Add Product
                </Button>
            </div>
        </motion.div>
    );
}

// Reusable Product Card
function ProductCard({ product }: { product: typeof productsData[0] }) {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            layout
        >
            <Card className="flex flex-col overflow-hidden rounded-xl shadow-md p-0 bg-white gap-0">
                <div className="relative w-full h-40 bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                        draggable={false}
                    />
                </div>
                <CardContent className="flex flex-col gap-1 px-4 py-4 flex-1">
                    <h2 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h2>
                    {product.shortDescription && (
                        <p className="text-sm text-gray-600 mb-1 line-clamp-2">{product.shortDescription}</p>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800">Rs. {product.price.toFixed(2)}</span>
                        <span
                            className={`text-xs px-2 py-1 rounded font-medium
                                ${product.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : product.status === "Inactive"
                                        ? "bg-gray-200 text-gray-500"
                                        : "bg-yellow-100 text-yellow-700"
                                }
                            `}
                        >
                            {product.status}
                        </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <Button
                            size="sm"
                            className="flex-1 flex items-center gap-1"
                            aria-label="Edit"
                        >
                            <Edit className="w-4 h-4 " />
                            <span className="text-xs font-medium ">Edit</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 flex items-center gap-1"
                            aria-label="Delete"
                        >
                            <Trash2 className="w-4 h-4 " />
                            <span className="text-xs font-medium ">Delete</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function ProductPage() {
    const { isAddProductDialogOpen, setIsAddProductDialogOpen } = useProductContext();

    // State for filters and sort
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState(""); // "name" | "price" | "status"
    const [status, setStatus] = useState(""); // "" means all

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = productsData;

        // Filter by search
        if (search.trim() !== "") {
            const lower = search.trim().toLowerCase();
            filtered = filtered.filter(
                p =>
                    p.name.toLowerCase().includes(lower) ||
                    (p.shortDescription && p.shortDescription.toLowerCase().includes(lower))
            );
        }

        // Filter by status
        if (status) {
            filtered = filtered.filter(p => p.status === status);
        }

        // Sort
        if (sortBy === "name") {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "price") {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortBy === "status") {
            // Sort by status alphabetically
            filtered = [...filtered].sort((a, b) => a.status.localeCompare(b.status));
        }

        return filtered;
    }, [search, sortBy, status]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full min-h-[100vh] relative flex flex-col px-12 py-4"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold"
            >
                Product Page
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="text-gray-400"
            >
                This is the product page where you can manage products.
            </motion.p>
            <div>
                <ProductFilters
                    search={search}
                    setSearch={setSearch}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    status={status}
                    setStatus={setStatus}
                />
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <AnimatePresence>
                    {filteredProducts.length === 0 ? (
                        <motion.div
                            className="col-span-full text-center text-gray-400 py-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            No products found.
                        </motion.div>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
            <AddProductDialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen} />
        </motion.div>
    );
}
