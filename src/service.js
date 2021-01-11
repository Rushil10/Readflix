export const onTabPress = (navigation, route) => {
    if (navigation?.isFocused?.()) {
        route?.params?.scrollToTop?.();
    }
};

export const scrollToTop = (navigation, ref) => {
    navigation.setParams({
        scrollToTop: () => ref?.current?.scrollTo({x:5,y:5,animated:true})
    });
};