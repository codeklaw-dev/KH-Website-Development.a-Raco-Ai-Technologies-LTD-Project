"use client";

import type { OrderField } from "../products/productData";
import { useEnquiryCart } from "./EnquiryCart";

export function ProductAddToEnquiry({ slug, title, n, fields }: { slug: string; title: string; n: string; fields: OrderField[] }) {
  const { isInCart, addItem, removeItem, openDrawer } = useEnquiryCart();
  const inCart = isInCart(slug);

  if (inCart) {
    return (
      <div className="detail-add is-added">
        <button className="button button-black" type="button" onClick={openDrawer}>Added to enquiry <span>✓</span></button>
        <button className="text-link" type="button" onClick={() => removeItem(slug)}>Remove <span>✕</span></button>
      </div>
    );
  }

  return (
    <div className="detail-add">
      <button className="button button-red" type="button" onClick={() => addItem({ slug, title, n, fields })}>Add to enquiry <span>+</span></button>
    </div>
  );
}
