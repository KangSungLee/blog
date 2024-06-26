import React from "react";
import DeliveryTrackerContent from "../../components/implementation/deliveryTracker/DeliveryTrackerContent";

export default function Implementation() {
  return (
      <>
        <DeliveryTrackerContent/>
        <input type="hidden" value={'택배 운송장번호 조회'}/>
      </>
  );
}