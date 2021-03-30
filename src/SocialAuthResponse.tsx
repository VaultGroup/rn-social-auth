
export class SocialAuthResponse {
    constructor(
        public token?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phone?: string,
        public imageUrl?: string
    ) { }
}
