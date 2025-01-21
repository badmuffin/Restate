import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite"

// for handling deep linking
import * as Linking from "expo-linking"
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: 'com.badmuffin.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
}

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform)


// functionalities that we are going to use from appwrite
export const avatar = new Avatars(client);
export const account = new Account(client);

// login functionality
export async function login() {
  try {
    // Create a redirect URI for deep linking back to the app after authentication
    // generating a link based on the app configuration
    const redirectUri = Linking.createURL('/');

    // request an OAuth2 token for google authentication
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri // redirect uri for returningto the app
    );
    if (!response) throw new Error("Failed to login");

    // Opens a browser or in-app browser for the OAuth2 login
    const browserResult = await openAuthSessionAsync(
      response.toString(), // OAuth2 token url
      redirectUri
    )

    if (browserResult.type !== 'success')
      throw new Error("Failed to login (Broswer Result)")

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if (!secret || !userId)
      throw new Error("Login Error (invalid session crudentials)");

    // create a session
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    if (error instanceof Error)
      return error.message;
    else
      return error;
  }
}

// logout 
export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    if (error instanceof Error)
      return error.message;
    else
      return error;
  }
}

export async function getUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString()
      }
    }

    return response;
  } catch (error) {
    if (error instanceof Error)
      return error.message;
    else
      return error;
  }
}