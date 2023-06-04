import { FC } from "react";
import { View } from "react-native";

const Divider: FC<any> = ({ space = 15 }) => {
    return <View style={{ paddingTop: space }} />;
};

export default Divider;
