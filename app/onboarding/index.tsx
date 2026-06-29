import { Colors } from "@/constants/Colors";
import React, { FC, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, StyleSheet, View } from "react-native";
import Button from "../shared/button";
import Stepone from "./components/Stepone";
import Stepthree from "./components/Stepthree";
import Steptwo from "./components/Steptwo";
import { router } from "expo-router";

interface OnboardingProps {}

const data = [
  { key: "1", component: Stepone },
  { key: "2", component: Steptwo },
  { key: "3", component: Stepthree },
];

const Onboarding: FC<OnboardingProps> = ({}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");
  const [visibleIndex, setVisibleIndex] = useState(0);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const Component = item.component;
    return (
      <View style={{ width }}>
        <Component isVisible={visibleIndex === index} />
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {data.map((_, i) => {
            const isActive = visibleIndex === i;
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotWidth = scrollX.interpolate({
              inputRange: [(i - 3) * width, i * width, (i + 3) * width],
              outputRange: [12, 49, 12],
              extrapolate: "clamp",
            });

            const dotHeight = scrollX.interpolate({
              inputRange: [(i - 7) * width, i * width, (i + 7) * width],
              outputRange: [12, 7, 12],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    opacity,
                    width: dotWidth,
                    height: dotHeight,
                    backgroundColor: isActive
                      ? Colors.light.primary
                      : Colors.light.cardColor,
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="flat"
            onPress={() =>
              router.push({
                pathname: "/signup",
              })
            }
          >
            Get Started
          </Button>
          <Button
            onPress={() =>
              router.push({
                pathname: "/login",
              })
            }
            mode="normal"
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    marginBottom: 150,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  dot: {
    height: 12,
    width: 22,
    backgroundColor: Colors.light.primary,
    borderRadius: 6,
    margin: 8,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  buttonContainer: {
    marginHorizontal: 16,
    gap: 19,
  },
});

export default Onboarding;
