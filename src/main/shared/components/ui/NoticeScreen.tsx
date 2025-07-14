import { StyleProp, ViewStyle } from 'react-native';
import CustomText from './CustomText';
import { ThemedView } from './ThemedView';

interface Props {
    style?: StyleProp<ViewStyle>;
    title: string;
    message?: string;
    onRetry?: () => void;
}


const NoticeScreen = ({title, message, onRetry, style}: Props) => {
  return (
    <ThemedView style={[{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16}, style]} >
      <CustomText  style ={{textAlign: 'center'}} category='h1' status='warning'  >{title}</CustomText>

      {
        message &&
        <>
        <CustomText  category='s1'  style ={{marginTop: 20}} >{message}</CustomText>
        </>

      }

        {/* {onRetry && (
            <Button onPress={onRetry}>Retry</Button>
        )} */}

    </ThemedView>
  )
}
export default NoticeScreen