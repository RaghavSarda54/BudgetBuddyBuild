import React, { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import styles from "./custom.module.css"
export default function Custom(props) {
  // React state to manage selected options
//   const [selectedOptions, setSelectedOptions] = useState([
//     { value: "red", label: "Red" },
//     { value: "green", label: "Green" },
//     { value: "yellow", label: "Yellow" },
//     { value: "blue", label: "Blue" },
//     { value: "white", label: "White" }
//   ]);

  // Array of all options
  const [options,setoptions]= useState(props.options)

  // Function triggered on selection
//   function handleSelect(data) {
//     setSelectedOptions(data);
//   }
//   function handlechange(data) {
//     if(optionList.includes(data)===false){
//         optionList= [... data]
//     }
//   }
    const handlecreate= async(e)=>{
      // console.log(e);
      setoptions((option)=>{
        return [...option,{value:e,label:e}];
      });
    }
    useEffect(()=>{
      async function fetchData(){

      }
    })
  return (
    <CreatableSelect isMulti  options={options} onChange={props.handlechange} onCreateOption={handlecreate} value={props.value} />
    // <div role="combobox" aria-expanded="false">
    //   <a class="ui label" value="Social security">Social security<i aria-hidden="true" class="delete icon"></i></a>
    //   <input aria-autocomplete="list" autocomplete="off" class="search" tabindex="0" type="text" value="" />
    //     <span class="sizer"></span>
    //     <div aria-atomic="true" aria-live="polite" role="alert" class="divider text">Choose existing tags or add new</div>
    //     <i aria-hidden="true" class="dropdown icon"></i>
    //     <div aria-multiselectable="true" role="listbox" class="menu transition">
    //       <div role="option" aria-checked="false" aria-selected="true" class="selected item" style="pointer-events: all;">
    //         <span class="text">Groceries</span>
    //         </div>
    //         <div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;">
    //           <span class="text">Restaurant</span></div>
    //           <div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Rent</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Income tax</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Utilities</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Food</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Shopping</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Clothes</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Vacation</span></div></div></div>
  );
}
