import Toast from "react-native-toast-message";

export const showToast = (
    type: "success" | "error" | "info",
    text: string = "🐳 🐳 🐳‍"
) => {
    Toast.show({
        type,
        text1: text,
    });
};

export const hideToast = () => {
    Toast.hide();
};
