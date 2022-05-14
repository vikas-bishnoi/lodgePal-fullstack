import React, { useEffect } from "react";
import styled from "styled-components/native";
import colors from "../../colors";
import RoomPhotos from "./../../components/RoomPhotos";

const Container = styled.View``;

const DataContainer = styled.View`
  padding: 0px 30px;
`;
const Address = styled.Text`
  margin-top: 10px;
  font-size: 24px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const PropertyInfoData = styled.View`
  background-color: ${colors.green};
  margin-right: 10px;
  border-radius: 5px;
`;

const PropertyInfoText = styled.Text`
  color: white;
  font-weight: 500;
  padding: 5px 10px;
`;

const formatQty = (number, name) => {
  if (number === 1) {
    return `${number} ${name}`;
  }
  return `${number} ${name}s`;
};

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <Container>
      <RoomPhotos photos={params.photos} factor={2} />

      <DataContainer>
        <Address>{params.address}</Address>
        <PropertyInfoContainer>
          <PropertyInfoData>
            <PropertyInfoText>{formatQty(params.beds, "bed")}</PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQty(params.bedrooms, "bedroom")}
            </PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQty(params.bathrooms, "bathroom")}
            </PropertyInfoText>
          </PropertyInfoData>
        </PropertyInfoContainer>
      </DataContainer>
    </Container>
  );
};
