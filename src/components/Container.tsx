import { SafeAreaView } from 'react-native';

export function Container({ children }: { children: React.ReactNode }) {
  return <SafeAreaView className="m-6 flex flex-1">{children}</SafeAreaView>;
}
