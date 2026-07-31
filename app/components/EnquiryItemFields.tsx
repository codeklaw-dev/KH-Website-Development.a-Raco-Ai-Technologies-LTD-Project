"use client";

import type { EnquiryItem } from "./EnquiryCart";
import { useEnquiryCart } from "./EnquiryCart";

export function EnquiryItemFields({ item }: { item: EnquiryItem }) {
  const { removeItem, updateValue } = useEnquiryCart();

  return (
    <article className="enquiry-item">
      <div className="enquiry-item-head"><span>{item.n}</span><h3>{item.title}</h3><button type="button" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.title}`}>Remove</button></div>
      {item.fields.map((field, index) => (
        <label key={field.label}>
          <span>{field.label}</span>
          {field.type === "select" ? (
            <select value={item.values[index] || ""} onChange={(event) => updateValue(item.slug, index, event.target.value)}>
              <option value="" disabled>Select one</option>
              {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          ) : (
            <input value={item.values[index] || ""} onChange={(event) => updateValue(item.slug, index, event.target.value)} placeholder={field.placeholder} />
          )}
        </label>
      ))}
    </article>
  );
}
