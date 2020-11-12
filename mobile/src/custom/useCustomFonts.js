import { Inconsolata_700Bold, Inconsolata_400Regular } from '@expo-google-fonts/inconsolata'
import { Oxygen_400Regular, Oxygen_700Bold, Oxygen_300Light } from '@expo-google-fonts/oxygen'
import { useFonts } from 'expo-font'

export default () => {
  return useFonts({
    Inconsolata_400Regular,
    Inconsolata_700Bold,
    Oxygen_400Regular,
    Oxygen_700Bold,
    Oxygen_300Light
  })
}
