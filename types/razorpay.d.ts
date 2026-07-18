// Ambient type for the Razorpay Checkout script, loaded imperatively via
// <script src="https://checkout.razorpay.com/v1/checkout.js"> in
// components/checkout/CheckoutView.tsx. The `razorpay` npm package only
// types the server-side Orders API, not this browser global.
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
