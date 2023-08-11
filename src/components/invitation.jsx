import React from "react";

const Invitation = () => {
  return (
    <small
      className="grid border p-2 mt-3"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      <p>1</p>
      <p>Some Random Title</p>
      <div className="mx-auto grid grid-cols-2 gap-2">
        <button className="text-green-600">
          <svg
            viewBox="0 0 665.8 1000"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
          </svg>
        </button>
        <button className="text-red-600">
          <svg viewBox="0 0 16 16" fill="currentColor" height="1em" width="1em">
            <path
              fill="currentColor"
              d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 000-.707L13.561.146a.499.499 0 00-.707 0L8 5 3.146.146a.5.5 0 00-.707 0L.146 2.439a.499.499 0 000 .707L5 8 .146 12.854a.5.5 0 000 .707l2.293 2.293a.499.499 0 00.707 0L8 11l4.854 4.854a.5.5 0 00.707 0l2.293-2.293a.499.499 0 000-.707z"
            />
          </svg>
        </button>
      </div>
    </small>
  );
};

export default Invitation;
