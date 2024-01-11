export abstract class ToastControllerProvider {
  public abstract timer: number;
  public abstract text: string;

  abstract create(timer?: number, text?: string): void;
}
