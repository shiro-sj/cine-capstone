import { Stack } from "expo-router"

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="movieDetails/[name]" />
        </Stack>
    )
}

export default StackLayout;