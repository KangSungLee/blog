import React from "react";
import Rating from "../../components/implementation/rating/Rating";

export default function Implementation() {
  return (
      <>
        <Rating/>
        <input type="hidden" value={'별점 평점 그리드'}/>
      </>
  );
}