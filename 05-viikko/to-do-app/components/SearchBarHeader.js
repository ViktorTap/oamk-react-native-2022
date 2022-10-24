import { View, Text, TextInput } from "react-native";
import React, { forwardRef } from "react";

const SearchBarHeader = forwardRef((props, ref) => (
  <TextInput
    style={props.searchBoxStyleProp}
    placeholder="search..."
    onChangeText={(search) => props.setSearch(search.toLowerCase())}
    defaultValue={props.search}
    // ref={ref}
    autofocus={true}
    returnKeyType="search"
  />
));

export default SearchBarHeader;
