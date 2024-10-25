import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(request : Request){
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get('query') || '';

    try{
        console.log(searchTerm)
        if (!searchTerm){
            return NextResponse.json({ users: []})
        }

        const users = await prisma.user.findMany({
            where :{
                username : {
                    contains: searchTerm,
                    mode : 'insensitive'
                },
            },
        });

        console.log(users)

        return NextResponse.json({users});
    }catch(e){
        console.error('Error fetching users' , e)
        return new Response(
            JSON.stringify({message: 'Error while fetching users' , status : 500}), {status: 500}
        )
    }
}

