'use client'
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SortAsc, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddProductDialog from "./components/Dialog/add";
import { useProductContext } from "./components/context";
// SearchBar Component
function ProductSearchBar() {
    return (
        <div className="flex-1">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search className="h-5 w-5" />
                </span>
            </div>
        </div>
    );
}

// Sort Dropdown Component
function SortByDropdown() {
    return (
        <Select>
            <SelectTrigger className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
        </Select>
    );
}

// Status Filter Dropdown Component
function StatusFilterDropdown() {
    return (
        <Select>
            <SelectTrigger className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="outofstock">Out of Stock</SelectItem>
            </SelectContent>
        </Select>
    );
}

// Filters Row Component
function ProductFilters() {
    const { setIsAddProductDialogOpen } = useProductContext();
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 my-6">
            {/* Search Bar */}
            <ProductSearchBar />
            {/* Filters */}
            <div className="flex gap-4">
                <SortByDropdown />
                <StatusFilterDropdown />
                <Button onClick={() => setIsAddProductDialogOpen(true)} className="flex items-center gap-2">
                    Add Product
                </Button>
            </div>
        </div>
    );
}

// Dummy product data
const products = [
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

// Reusable Product Card
function ProductCard({ product }: { product: typeof products[0] }) {
    return (
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
    );
}

export default function ProductPage() {
    const { isAddProductDialogOpen, setIsAddProductDialogOpen } = useProductContext();
    return (
        <div className="w-full min-h-[100vh] relative flex flex-col px-12 py-4">
            <h1 className="text-3xl font-bold">Product Page</h1>
            <p className="text-gray-400">This is the product page where you can manage products.</p>
            <div>
                <ProductFilters />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <AddProductDialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen} />
        </div>
    );
}
