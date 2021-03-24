import { NativeModules } from 'react-native';

type SocialAuthType = {
  multiply(a: number, b: number): Promise<number>;
};

const { SocialAuth } = NativeModules;

export default SocialAuth as SocialAuthType;
