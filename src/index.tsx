import { NativeModules } from 'react-native';

type SocialAuthType = {
  multiply(a: number, b: number): Promise<number>;
  googleSignIn(username: string, resolve: (response: string | null) => void): Promise<void>;
};

const { SocialAuth } = NativeModules;

export default SocialAuth as SocialAuthType;
