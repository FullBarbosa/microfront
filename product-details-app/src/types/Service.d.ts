interface IObject {
  title: string,
  description: string,
  price: number,
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

declare module "shell/Service" {
  export const useServiceContext: () => {
    cart: Product[];
    addProduct: (productId: number) => Promise<void>;
    removeProduct: (productId: number) => void;
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  };
}