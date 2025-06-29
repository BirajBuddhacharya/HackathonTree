'use client'
import NavBar from "@/components/AppComponents/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, ChevronDown, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Star, ShoppingBag } from "lucide-react";
import Link from 'next/link'
// Add framer-motion
import { motion } from "framer-motion";

const categories = [
    "AI",
    "Fintech",
    "Health",
    "E-commerce",
    "Edtech",
    "SaaS",
    "Web3",
];

const sortOptions = [
    "Newest",
    "Oldest",
    "Most Popular",
    "Price: Low to High",
    "Price: High to Low",
];

// Dummy product data for demonstration
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        rating: 4.5,
        description: "High-quality wireless headphones with noise cancellation.",
        image: "https://picsum.photos/800/1200?random=1", // 2:3 aspect ratio
        price: 129.99,
    },
    {
        id: 2,
        title: "Smart Watch",
        rating: 4.2,
        description: "Track your fitness and notifications on the go.",
        image: "https://picsum.photos/1200/800?random=2", // 3:2 aspect ratio
        price: 199.99,
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        rating: 4.8,
        description: "Portable speaker with deep bass and long battery life.",
        image: "https://picsum.photos/1000/1000?random=3", // 1:1 aspect ratio
        price: 59.99,
    },
    {
        id: 4,
        title: "VR Headset",
        rating: 4.1,
        description: "Experience immersive virtual reality at home.",
        image: "https://picsum.photos/900/1600?random=4", // 9:16 aspect ratio
        price: 349.99,
    },
    {
        id: 5,
        title: "Drone Camera",
        rating: 4.7,
        description: "Capture stunning aerial shots with ease.",
        image: "https://picsum.photos/1600/900?random=5", // 16:9 aspect ratio
        price: 499.99,
    },
    {
        id: 6,
        title: "Fitness Tracker",
        rating: 4.3,
        description: "Monitor your health and activity 24/7.",
        image: "https://picsum.photos/1080/1350?random=6", // 4:5 aspect ratio
        price: 79.99,
    },
    {
        id: 7,
        title: "Smart LED Lamp",
        rating: 4.6,
        description: "Adjustable brightness and color with smart controls.",
        image: "https://picsum.photos/1000/1000?random=7", // 1:1 aspect ratio
        price: 39.99,
    },
    {
        id: 8,
        title: "Eco-Friendly Water Bottle",
        rating: 4.3,
        description: "Reusable bottle made from sustainable materials.",
        image: "https://picsum.photos/800/1200?random=8", // 2:3 aspect ratio
        price: 24.99,
    },
    {
        id: 9,
        title: "Bluetooth Keyboard",
        rating: 4.1,
        description: "Slim, portable keyboard for all your devices.",
        image: "https://picsum.photos/1200/800?random=9", // 3:2 aspect ratio
        price: 49.99,
    },
    {
        id: 10,
        title: "Noise Cancelling Earbuds",
        rating: 4.4,
        description: "Block out distractions with active noise cancellation.",
        image: "https://picsum.photos/900/1600?random=10", // 9:16 aspect ratio
        price: 89.99,
    },
    {
        id: 11,
        title: "Portable Projector",
        rating: 4.5,
        description: "Project movies and presentations anywhere.",
        image: "https://picsum.photos/1600/900?random=11", // 16:9 aspect ratio
        price: 299.99,
    },
    {
        id: 12,
        title: "Smart Thermostat",
        rating: 4.2,
        description: "Control your home's temperature remotely.",
        image: "https://picsum.photos/1080/1350?random=12", // 4:5 aspect ratio
        price: 149.99,
    },
    {
        id: 13,
        title: "Wireless Charger",
        rating: 4.7,
        description: "Fast, convenient charging for your devices.",
        image: "https://picsum.photos/1000/1000?random=13", // 1:1 aspect ratio
        price: 29.99,
    },
    {
        id: 14,
        title: "Action Camera",
        rating: 4.6,
        description: "Capture adventures in stunning 4K resolution.",
        image: "https://picsum.photos/800/1200?random=14", // 2:3 aspect ratio
        price: 249.99,
    },
    {
        id: 15,
        title: "E-Reader",
        rating: 4.3,
        description: "Read your favorite books on the go.",
        image: "https://picsum.photos/1200/800?random=15", // 3:2 aspect ratio
        price: 119.99,
    },
    {
        id: 16,
        title: "Smart Home Hub",
        rating: 4.4,
        description: "Control all your smart devices from one place.",
        image: "https://picsum.photos/900/1600?random=16", // 9:16 aspect ratio
        price: 99.99,
    },
    {
        id: 17,
        title: "Electric Toothbrush",
        rating: 4.5,
        description: "Advanced cleaning with smart timers.",
        image: "https://picsum.photos/1600/900?random=17", // 16:9 aspect ratio
        price: 59.99,
    },
    {
        id: 18,
        title: "Laptop Stand",
        rating: 4.2,
        description: "Ergonomic stand for better posture.",
        image: "https://picsum.photos/1080/1350?random=18", // 4:5 aspect ratio
        price: 34.99,
    },
    {
        id: 19,
        title: "Portable Power Bank",
        rating: 4.8,
        description: "Charge your devices on the go.",
        image: "https://picsum.photos/1000/1000?random=19", // 1:1 aspect ratio
        price: 44.99,
    },
    {
        id: 20,
        title: "Smart Door Lock",
        rating: 4.6,
        description: "Secure, keyless entry for your home.",
        image: "https://picsum.photos/800/1200?random=20", // 2:3 aspect ratio
        price: 179.99,
    },
];

// Dummy data for the graph (e.g., sales per category)
const graphData = [
    { category: "AI", sales: 120, products: 3 },
    { category: "Fintech", sales: 98, products: 2 },
    { category: "Health", sales: 86, products: 4 },
    { category: "E-commerce", sales: 99, products: 5 },
    { category: "Edtech", sales: 65, products: 2 },
    { category: "SaaS", sales: 78, products: 3 },
    { category: "Web3", sales: 55, products: 1 },
];

// Helper to extract aspect ratio from image url comment
function getAspectRatioFromComment(product: typeof products[0]): number {
    // Try to extract aspect ratio from the comment in the image property
    // e.g. "// 2:3 aspect ratio"
    // fallback to 1 (square)
    const match = /(\d+):(\d+)/.exec(product.image + (product.image as any).comment || "");
    if (match) {
        const w = parseInt(match[1], 10);
        const h = parseInt(match[2], 10);
        return w / h;
    }
    // fallback: try to guess from url
    if (product.image.includes("800/1200")) return 800 / 1200;
    if (product.image.includes("1200/800")) return 1200 / 800;
    if (product.image.includes("1000/1000")) return 1;
    if (product.image.includes("900/1600")) return 900 / 1600;
    if (product.image.includes("1600/900")) return 1600 / 900;
    if (product.image.includes("1080/1350")) return 1080 / 1350;
    return 1;
}

// MasonryGrid component using CSS columns for Pinterest-like layout
function MasonryGrid({ children }: { children: React.ReactNode }) {
    // Use CSS columns for a true masonry effect (like Pinterest)
    // Children must be block elements with margin-bottom for gutter
    // Responsive: 1 column on xs, 2 on sm, 3 on md, 4 on xl
    return (
        <div
            className="
                w-full
                mt-8
                [column-count:1]
                sm:[column-count:2]
                md:[column-count:3]
                xl:[column-count:4]
                [column-gap:1.5rem]
            "
        >
            {children}
        </div>
    );
}

// ProductCard component for masonry layout
// Accepts an optional index prop for animation delay
function ProductCard({ product, index = 0 }: { product: typeof products[0], index?: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href='/product/[slug]' as={`/product/${product.id}`} className="block">
            <motion.div
                className="mb-6 break-inside-avoid rounded-xl overflow-hidden shadow-lg group transition-all bg-white"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    display: "inline-block",
                    width: "100%",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    // Removed delay according to index
                }}
            >
                <div className="relative w-full">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto block object-cover transition-all duration-200"
                        draggable={false}
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            aspectRatio: getAspectRatioFromComment(product),
                            objectFit: "cover",
                        }}
                    />
                    {/* Overlay on hover */}
                    <div
                        className={`
                        absolute inset-0 flex flex-col justify-end
                        bg-black/0 group-hover:bg-black/60
                        transition-all duration-300
                        ${hovered ? "bg-black/60" : "pointer-events-none"}
                        `}
                    >
                        <div
                            className={`
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                            p-3 sm:p-5
                            text-white
                            flex flex-col gap-2
                            `}
                        >
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-base sm:text-lg font-semibold">{product.title}</h3>
                                <span className="flex items-center gap-1 text-yellow-400 font-medium">
                                    <Star size={16} className="inline" fill="currentColor" />
                                    {product.rating}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-base sm:text-lg font-bold">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm line-clamp-2">{product.description}</p>
                            <div className="flex flex-col gap-2 mt-3 sm:flex-row">
                                <Button
                                    variant="default"
                                    className="flex-1 flex items-center gap-2"
                                >
                                    <ShoppingBag size={16} />
                                    <span className="hidden xs:inline">Buy</span>
                                </Button>
                                <Button
                                    className="flex-1 flex items-center gap-2 border-white bg-white text-black hover:bg-gray-100 transition-colors"
                                >
                                    <ShoppingCart size={16} />
                                    <span className="hidden xs:inline">Add to Cart</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

// HeaderActions now receives and controls search, selectedCategories, sortBy, and their setters
function HeaderActions({
    search,
    setSearch,
    selectedCategories,
    setSelectedCategories,
    sortBy,
    setSortBy,
}: {
    search: string;
    setSearch: (s: string) => void;
    selectedCategories: string[];
    setSelectedCategories: (c: string[]) => void;
    sortBy: string;
    setSortBy: (s: string) => void;
}) {
    const [showSort, setShowSort] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close sort dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (showSort && sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setShowSort(false);
            }
            if (showFilters && filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setShowFilters(false);
            }
        }
        if (showSort || showFilters) {
            document.addEventListener("mousedown", handleClick);
        }
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showSort, showFilters]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
    };

    return (
        <div className="flex flex-col w-full gap-4 mb-6 mt-5">
            {/* Search Bar and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        className="pl-10 pr-4 py-3 rounded-lg w-full sm:w-80 md:w-96"
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-auto">
                    {/* Filters Button */}
                    <div className="relative" ref={filterRef}>
                        <Button
                            variant="outline"
                            className="flex gap-2"
                            onClick={() => setShowFilters((f) => !f)}
                        >
                            <Filter size={16} />
                            <span className="hidden xs:inline">Filters</span>
                            {selectedCategories.length > 0 && (
                                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 text-xs">{selectedCategories.length}</span>
                            )}
                        </Button>
                        {showFilters && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow z-20 p-4">
                                <div className="mb-2 font-semibold text-sm">Categories</div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            className={`px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition ${selectedCategories.includes(cat)
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-muted text-muted-foreground border-muted"
                                                }`}
                                            onClick={() => toggleCategory(cat)}
                                            type="button"
                                        >
                                            {cat}
                                            {selectedCategories.includes(cat) && (
                                                <X size={14} className="ml-1" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-end mt-4 gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={clearFilters}
                                        disabled={selectedCategories.length === 0}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => setShowFilters(false)}
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Sort By */}
                    <div className="relative" ref={sortRef}>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => setShowSort((s) => !s)}
                        >
                            <span className="hidden xs:inline">Sort by:</span> <span className="font-medium">{sortBy}</span>
                            <ChevronDown size={16} />
                        </Button>
                        {showSort && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                                {sortOptions.map(option => (
                                    <button
                                        key={option}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${option === sortBy ? "bg-gray-100 font-semibold" : ""}`}
                                        onClick={() => {
                                            setSortBy(option);
                                            setShowSort(false);
                                        }}
                                        type="button"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition ${selectedCategories.includes(cat)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-muted"
                            }`}
                        onClick={() => toggleCategory(cat)}
                        type="button"
                    >
                        {cat}
                        {selectedCategories.includes(cat) && (
                            <X size={14} className="ml-1" />
                        )}
                    </button>
                ))}
                {selectedCategories.length > 0 && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="ml-2"
                        onClick={clearFilters}
                    >
                        Clear
                    </Button>
                )}
            </div>
        </div>
    );
}

// Filtering and sorting logic
function filterAndSortProducts({
    products,
    search,
    selectedCategories,
    sortBy,
}: {
    products: typeof products;
    search: string;
    selectedCategories: string[];
    sortBy: string;
}) {
    let filtered = products;

    // Filter by search
    if (search.trim() !== "") {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
            p =>
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
        );
    }

    // Filter by categories (if any selected)
    if (selectedCategories.length > 0) {
        // For demo, randomly assign categories to products based on id
        const catMap: { [id: number]: string[] } = {};
        for (const p of products) {
            // For demo, assign 1-2 categories per product
            const idx = (p.id - 1) % categories.length;
            catMap[p.id] = [categories[idx]];
            if (p.id % 3 === 0) catMap[p.id].push(categories[(idx + 1) % categories.length]);
        }
        filtered = filtered.filter(p =>
            catMap[p.id].some(cat => selectedCategories.includes(cat))
        );
    }

    // Sort
    let sorted = [...filtered];
    switch (sortBy) {
        case "Newest":
            sorted.sort((a, b) => b.id - a.id);
            break;
        case "Oldest":
            sorted.sort((a, b) => a.id - b.id);
            break;
        case "Most Popular":
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case "Price: Low to High":
            sorted.sort((a, b) => a.price - b.price);
            break;
        case "Price: High to Low":
            sorted.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }
    return sorted;
}

// Main page
export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState(sortOptions[0]);

    const filteredProducts = filterAndSortProducts({
        products,
        search,
        selectedCategories,
        sortBy,
    });

    return (
        <div className="container mx-auto px-2 sm:px-4">
            <NavBar />
            <HeaderActions
                search={search}
                setSearch={setSearch}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            {/* Insert the graph here */}
            <MasonryGrid>
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full w-full text-center text-muted-foreground py-16 text-lg">
                        No products found.
                    </div>
                ) : (
                    filteredProducts.map((product, idx) => (
                        <ProductCard key={product.id} product={product} index={idx} />
                    ))
                )}
            </MasonryGrid>
        </div>
    );
}