export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public first_name: string | null,
    public langKey: string,
    public last_name: string | null,
    public imageUrl: string | null
  ) {}
}
