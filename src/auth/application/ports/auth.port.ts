export abstract class AuthPort {
  public abstract signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string>;
  public abstract signUpWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string>;
  public abstract signInWithGoogle(token: string): Promise<string>;
  public abstract signInWithApple(token: string): Promise<string>;
  public abstract signOut(token: string): Promise<void>;
  public abstract generateToken(userId: string): Promise<string>;
  public abstract verifyToken(token: string): Promise<boolean>;
  public abstract refreshToken(token: string): Promise<string>;
}
