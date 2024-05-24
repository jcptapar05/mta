import { NextResponse } from "next/server";

import prisma from "@/lib/prismaDb";
import bcrypt from "bcrypt";
export const POST = async (request) => {
  try {
    const json = await request.json();
    const {
      email,
      first_name,
      last_name,
      password,
      company,
      roleId,
      avatar,
      artistAddress,
      bio,
      facebook_link,
      instagram_link,
      linkedin_link,
      portfolio_link,
      businessType,
      website_url,
      billingCompanyName,
      billingCity,
      billingState,
      billingCountry,
      billingPostalCode,
      billingAddressOne,
      billingAddressTwo,
      billingPhoneNumber,
      shippingCompanyName,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingPostalCode,
      shippingAddressOne,
      shippingAddressTwo,
      shippingPhoneNumber,
      toggleShippingAddress,
      street,
    } = await json;
    const encryptPw = await bcrypt.hash(password, 10);

    const findUserIfExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUserIfExist) {
      return NextResponse.json({ message: "Email is already exist!" });
    }

    let billingCompanyId = await prisma.company.create({
      data: {
        company: billingCompanyName,
      },
    });

    let shippingCompanyId = await prisma.company.create({
      data: {
        company: shippingCompanyName,
      },
    });

    const users = await prisma.user.create({
      data: {
        email: email,
        first_name,
        last_name,
        password: encryptPw,
        roleId,
        business_type: businessType,
        website_url,
        company: { connect: { id: Number(billingCompanyId.id) } },
      },
    });

    let socialMediaData = await prisma.socialMedia.create({
      data: {
        facebook_link,
        linkedin_link,
        instagram_link,
        portfolio_link,
        website_link: website_url,
        userId: Number(users.id),
      },
    });

    let artists;
    if (roleId == 4) {
      artists = await prisma.artist.create({
        data: {
          userId: Number(users.id),
          first_name,
          last_name,
          company,
          avatar,
          address: artistAddress,
          bio,
          socialMediaId: Number(socialMediaData.id) || null,
          full_name: first_name + " " + last_name,
        },
      });
    }

    let address = await prisma.address.create({
      data: {
        companyId: +billingCompanyId.id || undefined,
        city: billingCity,
        country: billingCountry,
        postal_code: billingPostalCode,
        state: billingState,
        street: street,
        phone_number: +billingPhoneNumber,
        address_1: billingAddressOne,
        address_2: billingAddressTwo,
        userId: Number(users.id),
      },
    });

    let shippingAddress;
    let sameWithAddress = Boolean(toggleShippingAddress);
    shippingAddress = await prisma.shippingAddress.create({
      data: {
        companyId: +shippingCompanyId.id || undefined,
        street: sameWithAddress ? street : street,
        city: sameWithAddress ? billingCity : shippingCity,
        state: sameWithAddress ? billingState : shippingState,
        country: sameWithAddress ? billingCountry : shippingCountry,
        postal_code: sameWithAddress ? billingPostalCode : shippingPostalCode,
        address_1: sameWithAddress ? billingAddressOne : shippingAddressOne,
        address_2: sameWithAddress ? billingAddressTwo : shippingAddressTwo,
        phone_number: sameWithAddress
          ? +billingPhoneNumber
          : +shippingPhoneNumber,
        userId: users.id,
        same_with_Address: sameWithAddress,
        set_default: true,
      },
    });

    return NextResponse.json({ message: "Thank you for joining!" });
  } catch (error) {
    return NextResponse.json({ error: "Not Found!" });
  }
};
