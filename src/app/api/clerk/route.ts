import { prisma } from '@/lib/prisma'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    //processing the request and payload
    const payload: WebhookEvent = await request.json()
    console.log(payload)

    const evt: WebhookEvent = payload;
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

    if (eventType === 'user.deleted'){
        const {id} = evt.data

        const existingUser = await prisma.user.findUnique({
            where: { clerkId: id }
          });
          
          if (!existingUser) {
            return new Response('User does not exist.', { status: 404 });
          }

        const deleteUser = await prisma.user.delete({
            where: { clerkId: id}
        });

        if (!deleteUser){
            return new Response('Error occured -- user does not exist.', {status: 500})
        };

        return new Response(JSON.stringify({
            message: 'User deleted successfully.'
        }));
    };

    if (eventType === 'user.updated'){
        
        const {id, username, email_addresses} = evt.data;

        const existingUser = await prisma.user.findUnique({
            where: { clerkId: id }
          });
          
          if (!existingUser) {
            return new Response('User does not exist.', { status: 404 });
          };

        const updatedUser = await prisma.user.update({
           where:{
            clerkId: id,
           },
           data:{
            username: username as string,
            email:email_addresses[0].email_address
           }
           
        });

        if(!updatedUser){
            return new Response ('Error occurred -- no changes made.', {status: 500})
        };

        return Response.json({message: 'User updated successfully.', user: updatedUser})
    };
  } catch (e) {
    // something went wrong
    console.error('Something went wrong.', e);
    return new Response('An error occured while processing the request.', {status: 500}, )
  };
};

export async function GET() {

   try{
    const users = await prisma.user.findMany();
    return Response.json({ users });
   } catch(e){
    console.error('Error fetching users: ', e);

    return new Response('An error occured while fething users.', {status: 500})
   }
   
  };