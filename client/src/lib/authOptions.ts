import { getClient } from "@/app/api/apollo-client";
import { splitName } from "@/utils/helpers";
import { gql } from "@apollo/client";
import { sign } from "jsonwebtoken";
import { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider, { CredentialInput } from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

const FindOrCreateSSOUser = gql`
    mutation ($user: CreateSsoUserDto!) {
        findOrCreateSsoUser(user: $user) {
            id
            firstname
            lastname
            email
            avatar
            created_at
            updated_at
        }
    }
`;

export const authOptions = {
    providers: [
        GoogleProvider({
            /* google callback (https://console.cloud.google.com/apis/credentials/oauthclient/991775228942-4qo07dofbqcfg6nhlf9b5em4f73voo66.apps.googleusercontent.com?project=youtube-clone-280720)
            { // user
                id: '105461223470548115293',
                name: 'test Ahmed',
                email: 'mohamed.gad3633@gmail.com',
                image: 'https://lh3.googleusercontent.com/a/ACg8ocJ3w7SNoT41irurn5x8ySB3kY_Uh6tVXX8xo7x05mJL=s96-c'
            } 
            { // account
                provider: 'google',
                type: 'oauth',
                providerAccountId: '105461223470548115293',
                access_token: 'ya29.a0AfB_byAgt3e59z0B97cKI4T70RkHEQG0uiZpXlolsD6sjieeD4_pqKTPNd8MaFzhbJl3yosjzXWoOSnyU9s0qcd05pr58o65goyFWVb_VxtLNy5olqWxQgZTv5OUmeD1Q8_FovgKQ24JD5R5dT-OJHqGOWQxXm6oBZdqaCgYKAcoSARISFQGOcNnCc2dI3RjZkhvu1iA0-49JWw0171',
                expires_at: 1695784174,
                scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
                token_type: 'Bearer',
                id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5OTE3NzUyMjg5NDItNHFvMDdkb2ZicWNmZzZuaGxmOWI1ZW00Zjczdm9vNjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5OTE3NzUyMjg5NDItNHFvMDdkb2ZicWNmZzZuaGxmOWI1ZW00Zjczdm9vNjYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU0NjEyMjM0NzA1NDgxMTUyOTMiLCJlbWFpbCI6Im1vaGFtZWQuZ2FkMzYzM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImhtVTJDcTMwUjR6N09nOW9pVU16Y3ciLCJuYW1lIjoidGVzdCBBaG1lZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKM3c3U05vVDQxaXJ1cm41eDh5U0Iza1lfVWg2dFZYWDh4bzd4MDVtSkw9czk2LWMiLCJnaXZlbl9uYW1lIjoidGVzdCIsImZhbWlseV9uYW1lIjoiQWhtZWQiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY5NTc4MDU3NSwiZXhwIjoxNjk1Nzg0MTc1fQ.ngPInBlKC1N5m6go85Z_XsHZiYFuu4-9vTOC5Kwg8Ut_AwrID2nOyEMvrLoPyIoqmh36ebe37hR-xgWArWpyDcfnMh0yV2U17u8DYt2Azv9QNfedIP_u94WvmPvnbN8h7AWJo7xs7j6oCkrrLgKyaPU5TC6H7v-pdsSbPHRypzINYt2Ko2MmsW0BiTo_YaB5iAGSdJe_m2LrwpJJFyMA1dpcf6mQvNauzn2XraM8WRkyTyjNa4pV6jbW9Ov6nEMtSYulOGfLWjqkHTjiC4j_XY4JjlkTDk4RXWE2oddBojSXGC4ohG8zXhW5B6FlFJUkOgFvIbWVpTBtyQVYzvRMsg'
            } 
            { // profile
                iss: 'https://accounts.google.com',
                azp: '991775228942-4qo07dofbqcfg6nhlf9b5em4f73voo66.apps.googleusercontent.com',
                aud: '991775228942-4qo07dofbqcfg6nhlf9b5em4f73voo66.apps.googleusercontent.com',
                sub: '105461223470548115293',
                email: 'mohamed.gad3633@gmail.com',
                email_verified: true,
                at_hash: 'hmU2Cq30R4z7Og9oiUMzcw',
                name: 'test Ahmed',
                picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ3w7SNoT41irurn5x8ySB3kY_Uh6tVXX8xo7x05mJL=s96-c',
                given_name: 'test',
                family_name: 'Ahmed',
                locale: 'en',
                iat: 1695780575,
                exp: 1695784175
            } 
            */
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        FacebookProvider({
            /* facbook callback (https://developers.facebook.com/apps/300419836037505/dashboard/)
                { // user
                    id: '7392282184121141',
                    name: 'Mohamed Ahmed',
                    email: 'mohamed_7el17@yahoo.com',
                    image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=7392282184121141&height=50&width=50&ext=1698370998&hash=AeRSDWmnLbZwoDouMGE'
                }
                { // account
                    provider: 'facebook',
                    type: 'oauth',
                    providerAccountId: '7392282184121141',
                    access_token: 'EAAEROvGcSYEBO1vbMYt2xQCh2Vr4IAgbGPVoZB0xmGqwZCNEAyetZAYKeQ90F74r2uopHtmtIgoLuJuaMXpkDUpZC1fivuVfvDbMvTbYRMZAurytZATlSTXJz5oCyeOPiBImnXxzado7JMnTGZAjUeZAHvMq0jUAYJloybNNyn3ZALu3wnt0WqUxXr9JB5hbasNR2Pz5eZBaReU6ZB14aDiUieEZAC8nC5GObPVj1Tfie3IyBCv6n1ZAZCzZAaT',
                    token_type: 'bearer',
                    expires_at: 1700962897
                }
                { // profile
                    id: '7392282184121141',
                    name: 'Mohamed Ahmed',
                    email: 'mohamed_7el17@yahoo.com',
                    picture: {
                        data: {
                        height: 50,
                        is_silhouette: false,
                        url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=7392282184121141&height=50&width=50&ext=1698370998&hash=AeRSDWmnLbZwoDouMGE',
                        width: 50
                        }
                    }
                } 
            */
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            authorize(credentials) {
                // console.log(credentials, 333333333);
                const { user } = credentials as { user: any };

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            session.access_token = sign(token, process.env.NEXTAUTH_SECRET);
            return Promise.resolve(session);
        },
        async jwt({ token, account, user }: { token: JWT; account: Account | null; user: User }) {
            if (account) {
                token.provider = account?.provider;
            }
            if (user) {
                token.provider_id = user?.id;
            }
            return Promise.resolve(token);
        },
        async signIn({
            user,
            account,
            profile,
            email,
            credentials,
        }: {
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile;
            email?: {
                verificationRequest?: boolean;
            };
            credentials?: Record<string, CredentialInput>;
        }): Promise<string | boolean> {
            if (account?.provider == "credentials") return true;

            if (user) {
                const client = getClient();
                const { firstname, lastname } = splitName(user?.name);

                try {
                    await client.mutate({
                        mutation: FindOrCreateSSOUser,
                        variables: {
                            user: {
                                firstname,
                                lastname,
                                email: user.email,
                                avatar: user.image,
                                provider: account?.provider,
                            },
                        },
                    });

                    return true;
                } catch (error) {
                    return false;
                }
            }

            return false;
        },
    },
};
