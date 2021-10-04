import React from "react";
import styled from "styled-components";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

const MapContainer = styled.div`
  flex: 1;
  height: 100%;
`;

export default function Map() {
  return (
    <MapContainer>
      <RenderAfterNavermapsLoaded ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT_ID}>
        <NaverMap
          style={{
            width: "100%",
            height: "100%",
          }}
          defaultCenter={{ lat: 37.46025885844518, lng: 126.44115925263594 }}
          defaultZoom={10}
        />
      </RenderAfterNavermapsLoaded>
    </MapContainer>
  );
}
