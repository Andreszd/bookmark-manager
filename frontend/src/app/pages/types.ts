export type Page = {
  _id: string;
  url: string;
  name: string;
  thumbnailUrl: string;
  createdAt: Date;
};

export interface SaveGroupEventPayload {
  name: string;
  onSuccess: () => void;
  onError: () => void;
}
