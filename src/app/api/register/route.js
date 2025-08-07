import { connectToDatabase } from '@/lib/db';
import User from '@/lib/models/user';

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, phonenumber, student } = body;

    await connectToDatabase();

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: 'Email already in use' }, { status: 400 });
    }

    const newUser = new User({ firstname, lastname, email, phonenumber, student });
    await newUser.save();

    return Response.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
}
