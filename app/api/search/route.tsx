import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { asin } = await req.json();

        if (!asin) {
            return NextResponse.json(
                { error: "ASIN is required" },
                { status: 400 }
            );
        }

        const query = `
            query amazonProduct {
                amazonProduct(input: { asinLookup: { asin: "${asin}" } }) {
                    title
                    brand
                    mainImageUrl
                    ratingsTotal
                    rating
                    url
                    price {
                        display
                    }
                }
            }
        `;

        const response = await fetch('https://graphql.canopyapi.co/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': process.env.CANOPY_API_KEY!,
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: "Failed to fetch product details" },
            { status: 500 }
        );
    }
} 