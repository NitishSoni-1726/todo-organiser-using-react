import React from "react";
export default function Search(props) {
  const searchRef = React.createRef();
  return (
    <div className="w-100 mt-3">
      <input
        type="text"
        className="w-100 bg-transparent border border-2 p-2 text-light rounded"
        placeholder="Type to Search..."
        onKeyUp={() => {
          if (searchRef.current) {
            props.onSearch(searchRef.current.value);
          }
        }}
        ref={searchRef}
      ></input>
    </div>
  );
}
