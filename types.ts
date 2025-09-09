export enum GeneratorType {
  Logo = 'Logo',
  Banner = 'Banner',
  SocialPoster = 'SocialPoster',
}

export interface FormData {
  logoText: string;
  copyTitle: string;
  copyText: string;
  features: string;
  description: string;
  buttonText: string;
}

export interface GeneratedImage {
  id: string;
  base64: string;
  sizeLabel: string;
  isLoading?: boolean;
}