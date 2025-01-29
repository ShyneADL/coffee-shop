import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
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
    <View
      style={{ width: "100%" }}
      className="flex flex-row items-center justify-between gap-4 w-full mt-5 py-2"
    >
      <View className="flex-1 bg-[#2A2A2A] rounded-[12px] flex flex-row gap-2 items-center justify-start p-4 z-50">
        <Image source={icons.Search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search coffee"
          placeholderTextColor="#ACACAC"
          className="text-sm font-Sora rounded-[12px] leading-[120%] text-white flex-1 outline-none"
        />
      </View>

      <TouchableOpacity className="bg-primary p-4 rounded-[12px]">
        <Image source={icons.Filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
