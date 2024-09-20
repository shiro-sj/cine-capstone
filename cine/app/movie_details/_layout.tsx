import { Stack } from 'expo-router';


const movieLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[name]" options={{headerShown: false}}/>
    </Stack>

  )
};

export default movieLayout;

