import { prisma } from '@/lib/prisma'
import { WebhookEvent } from '@clerk/nextjs/server'


export async function POST(request: Request) {
  try {

    //processing the request and payload
    const payload: WebhookEvent = await request.json()
    console.log(payload)

    const body = JSON.stringify(payload)

    let evt: WebhookEvent = payload;
    const eventType =  evt.type

    //creating a new user
    if (eventType === 'user.created'){
        const {id, email_addresses, username } = evt.data
        if (!id || !email_addresses || !email_addresses[0]?.email_address){
            return new Response('Erorr occurred -- missing data.', {status:400})
        }

         // create the user on prisma
        const newUser = await prisma.user.create({
            data:{
                clerkId: id as string,
                username: username as string,
                email: email_addresses[0].email_address
            }
    });

    return Response.json({
        message: 'User created succesfully',
        user: newUser
    });
    };

  } catch (e) {
    // something went wrong
    // no changes were made to the database
    return new Response('An error occured while processing the request.', {status: 500})
  }
}

export async function GET() {

   try{
    const users = await prisma.user.findMany();
    return Response.json({ users });
   } catch(e){
    console.error('Error fetching users: ', e);

    return new Response('An error occured while fething users.', {status: 500})
   }
   
  }