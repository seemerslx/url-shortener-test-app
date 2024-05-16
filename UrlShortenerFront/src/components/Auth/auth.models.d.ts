export interface claim {
    name: string;
    value: string;
};

export interface registerCredentionals{
    email: string;
    username: string;
    password: string;
}

export interface loginCredentionals{
    email: string;
    password: string;
}

export interface authenticationResponse{
    token: string;
    expiration: Date;   
}