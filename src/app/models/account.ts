export class Login {
    constructor(
        public username: string,
        public password: string,
        public grecaptchaResponse: string
    ) { }
}
export class ForgetPassword{
    constructor(
        public email: string
    ){}
}