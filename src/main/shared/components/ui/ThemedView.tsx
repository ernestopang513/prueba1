import { View, type ViewProps } from 'react-native';
import { useThemeStore } from '../../stores/useThemeStore';

// import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    level?: 1 | 2 | 3 | 4;
};

export function ThemedView({ style, lightColor, darkColor, level = 1, ...otherProps }: ThemedViewProps) {

    const theme = useThemeStore(state => state.theme)

    const backgroundColor = {
        1: theme.basic['100'],
        2: theme.basic['200'],
        3: theme.basic['300'],
        4: theme.basic['400'],
    }[level];

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}