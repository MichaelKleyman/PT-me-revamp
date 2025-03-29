export interface SessionManager {
  getSessionItem<T = string>(key: string): Promise<T | null>;
  setSessionItem<T>(key: string, value: T): Promise<void>;
  removeSessionItem(key: string): Promise<void>;
  destroySession(): Promise<void>;
}

export enum UserType {
  Patient = "patient",
  Provider = "practitioner",
}
