// app/api/profile/saveThankyou/route.js
import { NextResponse } from 'next/server';
import { connectDB } from "@/db/mongoose";
import { SucessfulDonation } from "@/models/SucessfulDonation";

export const PUT = async (req) => {
  await connectDB();

  try {
    const { message, id } = await req.json();

    if (!message || !id) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updated = await SucessfulDonation.findByIdAndUpdate(
      id,
      { comment: message },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'ID not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Save thank you error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};