import { Grid, Link, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

function DeliveryTracker() {
  const [waybill, setWaybill] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState();
  const [loading, setLoading] = useState(false);
  const TRACKER_URL = 'https://apis.tracker.delivery';
  const carrierIdAry = [
    'kr.cjlogistics', 'kr.epost', 'kr.lotte', 'kr.logen', 'kr.hanjin', 'kr.cupost', 'kr.swgexp.cjlogistics',
    'cn.cainiao.global', 'de.dhl', 'jp.sagawa', 'jp.yamato', 'kr.actcore.ocean-inbound', 'kr.coupangls',
    'kr.chunilps', 'kr.cvsnet', 'kr.cway', 'kr.daesin', 'kr.epantos', 'kr.epost.ems', 'kr.goodstoluck',
    'kr.homepick', 'kr.honamlogis', 'kr.ilyanglogis', 'kr.kdexp', 'kr.kunyoung', 'kr.lotte.global', 'kr.ltl',
    'kr.slx', 'kr.swgexp.epost', 'kr.todaypickup', 'kr.yongmalogis', 'nl.tnt', 'un.upu.ems', 'us.fedex', 'us.ups',
    'us.usps', 'kr.hanips', 'kr.hdexp', 'jp.yuubin'
  ];

  const callLogAPI = async () => {
    setLoading(true);
    try {
      for (const id of carrierIdAry) {
        const response = await fetch(`${TRACKER_URL}/carriers/${id}/tracks/${waybill.toString().replace(/-/g, '')}`);
        if (response.ok) {
          const data = await response.json();
          if (!data.message) {
            processDeliveryData(data, id);
            deliveryTrackingNewWindow(id);
            setLoading(false);
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
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
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
    window.open(`https://tracker.delivery/#/${id}/${waybill.toString().replace(/-/g, '')}`, "_blank", specs);
  };

  return (
    <Grid container>
      <Grid item lg={6}>
        <div>
          <label>운송장 번호</label>
          <input type="text" placeholder="운송장 번호" onChange={handleWaybillChange} style={{marginLeft: 10}} />
        </div>
        <button type="submit" onClick={deliveryTracking} style={{marginTop: 5}}>
          조회하기
        </button>
        {loading ? (
          <div style={{marginTop: 20}}>
            <CircularProgress />
          </div>
        ) : (
          deliveryInfo && (
            <div>
              <h2>배송 정보</h2>
              <p>택배 코드: {deliveryInfo.carrierId}</p>
              <p>현재 상태: {deliveryInfo.status}</p>
            </div>
          )
        )}
      </Grid>
      <Grid item lg={6}>
        <p>운송장번호 입력시 저장 되어 있는 택배사는 자동으로 조회됩니다.</p>
        <Link href="https://tracker.delivery/carriers" target="_blank" rel="noopener noreferrer">
          지원되는 택배사
        </Link>
      </Grid>
    </Grid>
  );
}

export default DeliveryTracker;
