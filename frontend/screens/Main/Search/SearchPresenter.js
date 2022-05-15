import React, { useState } from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../../../components/Auth/DismissKeyboard";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import colors from "../../../colors";

const Container = styled.View`
  padding: 0px;
`;

const SearchContainer = styled.View`
  margin-top: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const SearchBar = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  border-radius: 12px;
  justify-content: center;
  padding-left: 10px;
`;

const CancelContainer = styled.TouchableOpacity``;

const CancelText = styled.Text``;

const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 10px;
`;

const FilterContainer = styled.View`
  align-items: center;
  margin-right: 15px;
`;

const FilterLabel = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Filter = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 2.5px 2.5px rgba(200, 200, 200, 0.5);
  width: 100px;
`;

const SearchBtn = styled.TouchableOpacity`
  background-color: ${colors.red};
  padding: 10px;
  margin: 10px 30px;
  border-radius: 10px;
  align-items: center;
`;

const SearchText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export default () => {
  const navigation = useNavigation();
  const [beds, setBeds] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const submit = () => {
    const form = {
      ...(beds && { beds }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(maxPrice && { max_price: maxPrice }),
    };

    console.log(form);
  };

  return (
    <DismissKeyboard>
      <>
        <Container>
          <SearchContainer>
            <SearchBar autoFocus={true} placeholder="Search by city..." />
            <CancelContainer onPress={() => navigation.goBack()}>
              <CancelText>Cancel</CancelText>
            </CancelContainer>
          </SearchContainer>
          <FiltersContainer
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            <FilterContainer>
              <FilterLabel>Beds</FilterLabel>
              <Filter
                value={beds}
                onChangeText={(text) => setBeds(text)}
                placeholder="0"
                keyboardType="number-pad"
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Bedrooms</FilterLabel>
              <Filter
                value={bedrooms}
                onChangeText={(text) => setBedrooms(text)}
                placeholder="0"
                keyboardType="number-pad"
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Bathrooms</FilterLabel>
              <Filter
                value={bathrooms}
                onChangeText={(text) => setBathrooms(text)}
                placeholder="0"
                keyboardType="number-pad"
              />
            </FilterContainer>
            <FilterContainer>
              <FilterLabel>Max. Price</FilterLabel>
              <Filter
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
                placeholder="$0"
                keyboardType="number-pad"
              />
            </FilterContainer>
            {/* <FilterContainer>
            <FilterLabel>Min. Price</FilterLabel>
            <Filter placeholder="$0" keyboardType="number-pad" />
          </FilterContainer> */}
          </FiltersContainer>
        </Container>
        <SearchBtn onPress={submit}>
          <SearchText>Search</SearchText>
        </SearchBtn>
      </>
    </DismissKeyboard>
  );
};
