import React, { useEffect, useState } from 'react';

function DeliveryTracker() {
  const [waybill, setWaybill] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState();
  const TRACKER_URL = 'https://apis.tracker.delivery';
  const carrierIdAry = ['kr.cjlogistics', 'kr.epost', 'kr.lotte', 'kr.logen', 'kr.hanjin'];

  const callLogAPI = async () => {
    try {
      for (const id of carrierIdAry) {
        const response = await fetch(`${TRACKER_URL}/carriers/${id}/tracks/${waybill.toString().replace(/-/g, '')}`);
        if (response.ok) {
          const data = await response.json();
          if (!data.message) {
            processDeliveryData(data, id);
            deliveryTrackingNewWindow(id)
            return;
          }
        } else {
          console.log(`error ${id}:`, response.statusText);
        }
      }

      setDeliveryInfo({
        description: 'No information found for the provided waybill number and carrier.',
        deliveryWorker: '',
        time: '',
        location: '',
        status: '',
        carrierId: '',
        company: '',
        allProgress: [],
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const processDeliveryData = (data, carrierId) => {
    const { carrier, progresses, state } = data;
    const { id: actualCarrierId } = carrier;
    const { text: status } = state;

    const progressInfo = progresses.map((progress) => {
      const { description, location, time, status } = progress;
      const { name } = location;
      return { description, location: name, time, status };
    });

    setDeliveryInfo({
      carrierId: actualCarrierId,
      status,
      allProgress: progressInfo,
    });
  };

  const handleWaybillChange = (e) => {
    setWaybill(e.target.value);
  };

  const deliveryTracking = () => {
    if (!waybill) {
      alert('운송장 번호를 입력해주세요.');
      return;
    }
    callLogAPI();
  };

  const deliveryTrackingNewWindow = (id) => {
    const width = 400;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const specs = `width=${width}, height=${height}, left=${left}, top=${top}`;
    window.open(`https://tracker.delivery/#/${id}/${waybill}`, "_blank", specs);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="t_invoice">운송장 번호</label>
        <input type="text" className="form-control" placeholder="운송장 번호" onChange={handleWaybillChange} />
      </div>
      <button type="submit" className="btn btn-default" onClick={deliveryTracking}>
        조회하기
      </button>
      {deliveryInfo && (
        <div>
          <h2>배송 정보</h2>
          <p>택배사: {deliveryInfo.carrierId}</p>
          <p>현재 상태: {deliveryInfo.status}</p>
        </div>
      )}
    </div>
  );
}

export default DeliveryTracker;