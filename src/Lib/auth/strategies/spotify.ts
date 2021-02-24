import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import User from "../../../Models/User";
import { IUser } from "../../../services/interfaces/user";
import { generateRefreshToken, generateToken } from "./auth";
// import { generateAllTokens } from "./auth";

passport.use(
  "spotify",
  new SpotifyStrategy(
    {
      //@ts-ignore
      clientID: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL!,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //check if the user already exist
        const user = await User.findOne({ spotify_id: profile.id });
        if (!user) {
          //@ts-ignore
          const photo = profile.photos[0].value;
          const user = new User({
            spotify_id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            photo,
            refreshToken: refreshToken,
          });
          const newUser = await user.save();
          const userToken = await generateToken(user.spotify_id);
          const userRToken = await generateRefreshToken(user.spotify_id);

          done(undefined, {
            user: newUser,
            refreshToken,
            accessToken,
            userToken,
            userRToken,
          });
        } else {
          //renew refresh token
          user.refreshToken = refreshToken;
          const userToken = await generateToken(user.spotify_id);
          const userRToken = await generateRefreshToken(user.spotify_id);

          done(undefined, {
            user,
            refreshToken,
            accessToken,
            userToken,
            userRToken,
          });
        }
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
