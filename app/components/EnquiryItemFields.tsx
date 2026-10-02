"use client";

import type { EnquiryItem } from "./EnquiryCart";
import { useEnquiryCart } from "./EnquiryCart";
import { MobileAccordion } from "./MobileAccordion";

export function EnquiryItemFields({ item }: { item: EnquiryItem }) {
  const { removeItem, updateValue } = useEnquiryCart();
  const answered = item.fields.reduce((total, _field, index) => (item.values[index] ? total + 1 : total), 0);

  return (
    <article className="enquiry-item">
      <MobileAccordion
        title={<><b className="enquiry-item-index">{item.n}</b>{item.title}</>}
        meta={`${answered}/${item.fields.length}`}
        action={
          <button type="button" className="enquiry-item-remove" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.title}`}>Remove</button>
        }
      >
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
      </MobileAccordion>
    </article>
  );
}
