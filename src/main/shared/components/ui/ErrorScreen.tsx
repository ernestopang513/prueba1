import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { ThemedView } from "./ThemedView";
import { useThemeStore } from "../../stores/useThemeStore";

interface Props {
  message?: string;
  onRetry?: () => void;
}


const ErrorScreen = ({message = 'Error inesperado', onRetry}: Props) => {
  const theme = useThemeStore(state => state.theme);
  return (
    <ThemedView style = {{flex: 1, justifyContent: 'center', paddingHorizontal: 20, alignItems: 'center', gap: 20 }} >
      <CustomText numberOfLines={5} category='h1' >Error</CustomText>
      <CustomText numberOfLines={5} category='h3' status='danger' >{message}</CustomText>
      <Ionicons name='bug-outline' size={50}  style = {{marginTop: 10}} color = {theme.danger[500]}  />
      {/* {
        onRetry && (
          <Button size='giant' onPress={onRetry} >Retry</Button>
        )
      } */}
    </ThemedView>
  )
}

export default ErrorScreen