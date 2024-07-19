import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { endpoint, body, token } = await request.json();
  console.log(token)
  try {
    const response = await fetch(`https://api.bridgeapi.io/v2/${endpoint}`, {
      method: 'POST',
      headers: {
        'Bridge-Version': '2021-06-01',
        'Content-Type': 'application/json',
        'Client-Id': process.env.BRIDGE_CLIENT_ID as string,
        'Client-Secret': process.env.BRIDGE_CLIENT_SECRET as string,
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}