"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";

const InputOption = ({ getStyles, Icon, isDisabled, isFocused, isSelected, children, innerProps, ...rest }) => {
 const [isActive, setIsActive] = useState(false);
 const onMouseDown = () => setIsActive(true);
 const onMouseUp = () => setIsActive(false);
 const onMouseLeave = () => setIsActive(false);

 // styles
 let bg = "transparent";
 if (isFocused) bg = "#eee";
 if (isActive) bg = "#B2D4FF";

 const style = {
  alignItems: "center",
  backgroundColor: bg,
  color: "inherit",
  display: "flex ",
 };

 // prop assignment
 const props = {
  ...innerProps,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  style,
 };

 return (
  <components.Option
   {...rest}
   isDisabled={isDisabled}
   isFocused={isFocused}
   isSelected={isSelected}
   getStyles={getStyles}
   innerProps={props}
  >
   <input
    type="checkbox"
    checked={isSelected}
   />
   {children}
  </components.Option>
 );
};

const Categories = ({ categories, placeholdername, handleCategories }) => {
 const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
 ];

 const router = useRouter();

 const [selected, setSelected] = useState(null);

 const handleChange = (e) => {
  // console.log(e);

  handleCategories(e);

  // if (e.length > 1) {
  //  let data = "";
  //  for (let i = 0; e.length > i; i++) {
  //   data += `&${e[i].value}`;
  //  }
  //  setSelected(data);
  //  return;
  // }

  // setSelected(e[0]?.value);
 };

 //  useEffect(() => {
 //   if (selected && selected.length > 0) {
 //    const urlWithParameter = `/shop_all?page=${selected}`;
 //    router.push(urlWithParameter);
 //    return;
 //   } else {
 //    const urlWithParameter = `/shop_all`;
 //    router.push(urlWithParameter);
 //   }
 //  }, [selected]);

 return (
  <Select
   onChange={handleChange}
   getOptionLabel={(option) => option.name}
   getOptionValue={(option) => option.name}
   options={categories}
   placeholder={placeholdername}
   closeMenuOnSelect={false}
   isMulti
   components={{
    IndicatorSeparator: () => null,
   }}
   styles={{
    control: (provided, state) => ({
     ...provided,
     boxShadow: "none",
     borderRadius: 0,
     padding: "4px 0",
    }),
    option: (provided, state) => ({
     ...provided,
     width: "100%",
    }),
   }}
  />
 );
};

export default Categories;
