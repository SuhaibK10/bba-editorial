export type OrderEmailItem = {
  productName: string;
  price: number;
  quantity: number;
};

export type OrderEmailData = {
  orderId: string;
  items: OrderEmailItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    pincode: string;
  };
};
