import jwt from "jsonwebtoken";

export const generateToken = async (id: string) => {
  try {
    const token = await jwt.sign({ id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    if (token) return token;
  } catch (err) {
    return null;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET!);
    if (decoded) return decoded;
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const generateRefreshToken = async (id: string) => {
  try {
    const token = await jwt.sign({ id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    if (token) return token;
  } catch (err) {
    return null;
  }
};

// export const verifyRefreshToken = async (token : any)=>{
//     try{
//         const refreshToken = token.split(" ")[1]
// console.log(refreshToken)
//     const decoded = await jwtr.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
//     console.log
//     if(decoded) {
//         console.log(decoded)
//         const jti = decoded.jti
//        // @ts-ignore
//         const expired = await jwtr.destroy(jti)
//         console.log(expired)
//         return decoded}
//     else {
//         await jwtr.destroy(token)
//         return null}
//     }catch(err){
//         console.log(err)
//     return null
//     }
//     }
