"use client";

import { useState } from "react";
import { ComboboxUI } from "../ui/combobox";

function ComboboxState({ items, placeholder = "Select an item" }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <ComboboxUI
        items={items}
        value={selectedValue}
        onItemSelect={handleSelect}
        placeholder={placeholder}
      />
    </div>
  );
}
export { ComboboxState };
