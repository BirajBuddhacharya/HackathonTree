// Define the Product type (can be extended as needed)
export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    status: string;
    shortDescription?: string;
    // Add more fields as needed
}

// Context value type
export interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    addProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
    updateProduct: (product: Product) => void;
    isAddProductDialogOpen: boolean;
    setIsAddProductDialogOpen: (open: boolean) => void;
}