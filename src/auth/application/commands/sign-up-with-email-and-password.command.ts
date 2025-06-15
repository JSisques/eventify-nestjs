export class SignUpWithEmailAndPasswordCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
