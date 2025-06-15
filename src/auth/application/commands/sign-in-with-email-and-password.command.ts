export class SignInWithEmailAndPasswordCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
