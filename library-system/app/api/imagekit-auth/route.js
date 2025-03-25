import ImageKit from "imagekit";
import { NextResponse } from "next/server";

export async function GET() {
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  });

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    console.log("Auth parameters generated:", authenticationParameters);
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.log("Auth generation error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
