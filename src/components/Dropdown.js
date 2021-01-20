import React, {useState,useRef} from 'react';
import {useOnClickOutside} from "../hooks/useOnOutsideClick";

const Dropdown = ({infectedByRegion,setRegion}) => {
    const [isDropdownExpanded,toggleDropdown] = useState(false);
    const [chosenRegion,setDropdownRegion] = useState(null);
    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => toggleDropdown(false));

    return (
        <div className="py-3 z-0 flex justify-center" ref={dropdownRef}>

            <div className="dropdown inline-block relative ">
                <button  className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center " onClick={()=>toggleDropdown(!isDropdownExpanded)}>
                    <span className="mr-1">{chosenRegion ? chosenRegion : 'Województwo'}</span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </button>
                <ul className={` h-40 overflow-y-scroll dropdown-menu min-w-max absolute rounded text-gray-700 mt-1 ${isDropdownExpanded ? '' : 'hidden'}`}>
                    {infectedByRegion.map((el,index)=>{
                        if(index!==0){
                            return <li key={el.region} className="" onClick={()=>{setDropdownRegion(el.region);toggleDropdown(false);setRegion(el.region)}}><span
                                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            >{el.region}</span></li>
                        }
                        return null;
                    })}
                </ul>
            </div>

        </div>
    );
};

export default Dropdown;
