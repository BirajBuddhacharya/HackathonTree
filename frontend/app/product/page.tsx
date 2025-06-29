'use client'
import NavBar from "@/components/AppComponents/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, ChevronDown, X } from "lucide-react";
import React, { useState } from "react";
import { ShoppingCart, Star, ShoppingBag } from "lucide-react";
import Link from 'next/link'

// Import Recharts for the graph
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';

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

function HeaderActions() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const [showSort, setShowSort] = useState(false);

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((c) => c !== cat)
                : [...prev, cat]
        );
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
                    <Button variant="outline" className="flex gap-2">
                        <Filter size={16} />
                        <span className="hidden xs:inline">Filters</span>
                    </Button>
                    {/* Sort By */}
                    <div className="relative">
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
                    >
                        {cat}
                        {selectedCategories.includes(cat) && (
                            <X size={14} className="ml-1" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

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
function ProductCard({ product }: { product: typeof products[0] }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href='/product/[slug]' as={`/product/${product.id}`} className="block">
            <div
                className="mb-6 break-inside-avoid rounded-xl overflow-hidden shadow-lg group transition-all bg-white"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    display: "inline-block",
                    width: "100%",
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
            </div>
        </Link>
    );
}

// Graph component using Recharts and dummy data
function ProductsGraph() {
    return (
        <div className="w-full my-8 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Sales by Category (Dummy Data)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                    <Bar dataKey="products" fill="#82ca9d" name="Products" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-2 sm:px-4">
            <NavBar />
            <HeaderActions />
            {/* Insert the graph here */}
            <ProductsGraph />
            <MasonryGrid>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </MasonryGrid>
        </div>
    );
}