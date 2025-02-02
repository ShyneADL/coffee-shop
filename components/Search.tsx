import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDebouncedCallback } from "use-debounce";
import icons from "@/constants/icons";
import { useLocalSearchParams, router, usePathname } from "expo-router";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={icons.Search} style={styles.searchIcon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search coffee"
          placeholderTextColor="#ACACAC"
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <Image source={icons.Filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 20,
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
    zIndex: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  input: {
    fontSize: 14,
    fontFamily: "Sora",
    borderRadius: 12,
    lineHeight: 16.8,
    color: "white",
    flex: 1,
    // outline: "none",
  },
  filterButton: {
    backgroundColor: "#C67C4E",
    padding: 16,
    borderRadius: 12,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

export default Search;
