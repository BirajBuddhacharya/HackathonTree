'use client'
import NavBar from '@/components/AppComponents/NavBar';
import Footer from "@/components/AppComponents/footer";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Leaf, Flame, Star, MessageCircle, Share2, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// Simulated API data (to be replaced with real API call)
const productData = {
    name: "Wireless Mouse",
    description: "Product description goes here. This is a detailed description of the product, highlighting its features and benefits.",
    price: 99.99,
    images: [
        {
            src: "https://picsum.photos/1920/1080?random=1",
            alt: "Product Image 1"
        },
        {
            src: "https://picsum.photos/1920/1080?random=2",
            alt: "Product Image 2"
        },
        {
            src: "https://picsum.photos/1920/1080?random=3",
            alt: "Product Image 3"
        }
    ],
    badges: [
        { label: "EcoFriendly", color: "green", icon: Leaf },
        { label: "Trending", color: "yellow", icon: Flame },
        { label: "Best Seller", color: "blue", icon: Star }
    ]
};

// Carousel component
function ProductImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToIndex = (idx: number) => {
        setActiveIndex(idx);
    };

    return (
        <div className='w-[46rem] relative'>
            <Carousel>
                <CarouselContent>
                    {images.map((img, idx) => (
                        <CarouselItem
                            key={idx}
                            className={activeIndex === idx ? "" : "hidden"}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-[400px] object-cover rounded-lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="flex justify-center gap-3 mt-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToIndex(idx)}
                        className={`border-2 rounded-md overflow-hidden focus:outline-none transition-all
                            ${activeIndex === idx ? "border-blue-500 ring-2 ring-blue-300" : "border-transparent opacity-70 hover:opacity-100"}
                        `}
                        style={{ padding: 0, background: "none" }}
                        tabIndex={0}
                        aria-label={`Show image ${idx + 1}`}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className={`w-20 h-14 object-cover ${activeIndex === idx ? "" : "opacity-80"}`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

// Quantity Selector component
function QuantitySelector({
    quantity,
    setQuantity,
}: {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <div className="flex items-center gap-1 mt-4">
            <button
                className="flex items-center p-3 justify-center rounded-full border-gray-300 bg-gray-100 hover:bg-gray-200 text-xl font-bold"
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
            >
                <Minus />
            </button>
            <span className="w-8 text-center text-lg font-medium select-none" id="quantity-value">
                {quantity}
            </span>
            <button
                className="flex items-center justify-center rounded-full text-black  bg-gray-100 hover:bg-gray-200 p-3"
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
            >
                <Plus />
            </button>
        </div>
    );
}

// Product Badges component
function ProductBadges({ badges }: { badges: { label: string; color: string; icon: React.ElementType }[] }) {
    return (
        <div className="flex gap-2 mt-2">
            {badges.map((badge, idx) => {
                const Icon = badge.icon;
                const bg = {
                    green: "bg-green-100 text-green-800",
                    yellow: "bg-yellow-100 text-yellow-800",
                    blue: "bg-blue-100 text-blue-800"
                }[badge.color] || "bg-gray-100 text-gray-800";
                return (
                    <span
                        key={idx}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded-full ${bg} text-xs font-semibold w-fit`}
                    >
                        <Icon className="w-4 h-4 mr-1" />
                        {badge.label}
                    </span>
                );
            })}
        </div>
    );
}

// Action Buttons component
function ProductActionButtons() {
    return (
        <div className="mt-4 space-x-2">
            <Button size='lg'>
                Buy Now
            </Button>
            <Button size='lg' variant='outline'>
                Add to Cart
            </Button>
        </div>
    );
}

// Social Buttons component
function ProductSocialButtons() {
    return (
        <div className='flex gap-8 items-center justify-center w-full '>
            <Button
                variant="ghost"
                aria-label="Chat"
                className="flex flex-col items-center gap-1 px-4 py-5"
            >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Chat</span>
            </Button>
            <Separator orientation="vertical" className="h-10" />
            <Button
                variant="ghost"
                aria-label="Share"
                className="flex flex-col items-center gap-1 px-4 py-5"
            >
                <Share2 className="w-5 h-5" />
                <span className="text-xs font-medium">Share</span>
            </Button>
            <Separator orientation="vertical" className="h-10" />
            <Button
                variant="ghost"
                aria-label="Wishlist"
                className="flex flex-col items-center gap-1 px-4 py-5"
            >
                <Heart className="w-5 h-5" />
                <span className="text-xs font-medium">Wishlist</span>
            </Button>
        </div>
    );
}

// Product Details Info component
function ProductDetailsInfo({
    quantity,
    setQuantity,
    product,
}: {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    product: typeof productData;
}) {
    return (
        <div className='flex flex-col gap-3'>
            <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
            <p className="text-gray-600 mt-2">
                {product.description}
            </p>
            <h1 className="text-3xl font-semibold">${product.price.toFixed(2)}</h1>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <ProductBadges badges={product.badges} />
            <ProductActionButtons />
            <Separator className="mt-4 mb-2" />
            <ProductSocialButtons />
        </div>
    );
}

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
    const [quantity, setQuantity] = useState<number>(1);

    // In a real app, fetch product data using params.slug here
    // For now, use the productData variable above

    // Add fallback values for missing productData fields
    const brand = (productData as any).brand || "Acme";
    const model = (productData as any).model || "X100";
    const color = (productData as any).color || "Black";
    const weight = (productData as any).weight || "1.2kg";
    const longDescription = (productData as any).longDescription || productData.description;

    return (
        <div>
            <NavBar />
            <div className='min-h-screen px-16 flex flex-col py-10'>
                <div className="w-full flex gap-10">
                    <ProductImageCarousel images={productData.images} />
                    <ProductDetailsInfo
                        quantity={quantity}
                        setQuantity={setQuantity}
                        product={productData}
                    />
                </div>
                <div className='w-full'>
                    <Separator className="my-8" />
                    <div className='flex gap-10'>
                        <div className="flex-1">
                            <Tabs defaultValue="specification" className="w-full">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="specification">Item Specification</TabsTrigger>
                                    <TabsTrigger value="description">Description</TabsTrigger>
                                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                </TabsList>
                                <TabsContent value="specification">
                                    {/* Example specification table, replace with real data */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-[300px] w-full text-left border border-gray-200 rounded-lg">
                                            <tbody>
                                                <tr className="border-b">
                                                    <th className="py-2 px-4 font-medium bg-gray-50">Brand</th>
                                                    <td className="py-2 px-4">{brand}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="py-2 px-4 font-medium bg-gray-50">Model</th>
                                                    <td className="py-2 px-4">{model}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="py-2 px-4 font-medium bg-gray-50">Color</th>
                                                    <td className="py-2 px-4">{color}</td>
                                                </tr>
                                                <tr>
                                                    <th className="py-2 px-4 font-medium bg-gray-50">Weight</th>
                                                    <td className="py-2 px-4">{weight}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabsContent>
                                <TabsContent value="description">
                                    <div className="prose max-w-none">
                                        <h2 className="text-xl font-semibold mb-2">Product Description</h2>
                                        <p>{longDescription}</p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="reviews">
                                    {/* Example reviews, replace with real data */}
                                    <div className="space-y-6">
                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">Jane Doe</span>
                                                <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                            </div>
                                            <p className="text-gray-700">Great product! Really helped me with my daily tasks.</p>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">John Smith</span>
                                                <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                            </div>
                                            <p className="text-gray-700">Excellent quality and fast shipping. Highly recommend!</p>
                                        </div>
                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">Alex Lee</span>
                                                <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9734;&#9734;</span>
                                            </div>
                                            <p className="text-gray-700">Good value for the price, but could improve packaging.</p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div className='w-96 flex flex-col items-center'>
                            <Card className='w-full py-6 my-0 sticky '>
                                <CardContent className='flex items-center justify-center px-6 my-0 w-full py-2 gap-4'>
                                    {/* Center the rating visually */}
                                    <div className="flex flex-col items-center justify-center w-36">
                                        <div className="flex items-end justify-center w-full">
                                            <span className="text-6xl font-bold leading-none">
                                                4.2
                                            </span>
                                            <span className="text-gray-500 text-sm mb-1 ml-1">
                                                /5
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full mt-0 justify-center">
                                        {[
                                            { label: "5", percent: 60 },
                                            { label: "4", percent: 25 },
                                            { label: "3", percent: 10 },
                                            { label: "2", percent: 3 },
                                            { label: "1", percent: 2 },
                                        ].map(({ label, percent }) => (
                                            <div key={label} className="flex items-center gap-2">
                                                <span className="w-4 text-sm font-medium">{label}</span>
                                                <Star className="w-4 h-4 text-yellow-500" fill="#facc15" />
                                                <div className="flex-1">
                                                    {/* Use shadcn Progress component */}
                                                    <Progress value={percent} className="h-2" />
                                                </div>
                                                <span className="w-8 text-xs text-gray-500 text-right">{percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}