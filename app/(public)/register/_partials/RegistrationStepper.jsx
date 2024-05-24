/* eslint-disable react/no-children-prop */
"use client";

import { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { BsTruck } from "react-icons/bs";
import UserInfo from "./UserInfo";
import Address from "./AddressInfo";
import { Separator } from "@/components/ui/separator";
import { AiOutlineSave, AiOutlineUser } from "react-icons/ai";
import getURL from "@/middleware/getUrl";
import ArtistInfo from "./ArtistInfo";
import { useToast } from "@/components/ui/use-toast";

const RegistrationStepper = ({ role }) => {
  const { toast } = useToast();
  const [stepperCurrent, setStepperCurrent] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkendInLink, setLinkendInLink] = useState("");

  const [street, setStreet] = useState("");
  const [billingCompanyName, setbillingCompanyName] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingAddressOne, setBillingAddressOne] = useState("");
  const [billingAddressTwo, setBillingAddressTwo] = useState("");
  const [billingPhoneNumber, setBillingAddressPhoneNumber] = useState("");
  const [shippingCompanyName, setShippingCompanyName] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingAddressOne, setShippingAddressOne] = useState("");
  const [shippingAddressTwo, setShippingAddressTwo] = useState("");
  const [shippingPhoneNumber, setShippingAddressPhoneNumber] = useState("");

  const [toggleShippingAddress, setToggleShippingAddress] = useState(false);

  const [businessRegistrationLincense, setBusinessRegistrationLincense] =
    useState("");
  const [taxResaleCertificate, setTaxResaleCertificate] = useState("");
  const [creditSheetReport, setCreditSheetReport] = useState("");
  const [
    noBusinessRegistrationLicenceExplaination,
    setNoBusinessRegistrationLicenceExplaination,
  ] = useState("");
  const [
    noTaxResaleCertificateExplaination,
    setNoTaxResaleCertificateExplaination,
  ] = useState("");

  const prev = () => {
    setStepperCurrent(stepperCurrent - 1);
  };
  const next = () => {
    setStepperCurrent(stepperCurrent + 1);
  };

  const nextAddressInfo = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setWebsiteUrl(item.websiteUrl);
    setEmail(item.email);
    setConfirmEmail(item.confirmEmail);
    setPassword(item.password);
    setConfirmPassword(item.confirmPassword);
  };

  const nextArtistInfo = (item) => {
    setFirstName(item?.firstName);
    setLastName(item?.lastName);
    setWebsiteUrl(item?.websiteUrl);
    setEmail(item?.email);
    setConfirmEmail(item?.confirmEmail);
    setPassword(item?.password);
    setConfirmPassword(item?.confirmPassword);
    setFacebookLink(item?.facebookLink);
    setLinkendInLink(item?.linkendInLink);
    setBio(item?.bio);
    setInstagramLink(item?.instagramLink);
    setPortfolioLink(item?.portfolioLink);
    setAvatar(item?.avatarName);
  };

  const RegisterUser = async () => {
    const response = await fetch(getURL("/api/v1/public/registration"), {
      method: "POST",
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        websiteUrl,
        businessType,
        roleId: role,
        billingCompanyName,
        billingCity,
        billingState,
        billingCountry,
        billingPostalCode,
        billingAddressOne,
        street,
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
        bio,
        avatar,
        facebook_link: facebookLink,
        instagram_link: instagramLink,
        portfolio_link: portfolioLink,
        linkedin_link: linkendInLink,
        toggleShippingAddress,
      }),
    });

    const data = await response.json();

    if (response.ok && data.message == "Thank you for joining!") {
      toast({
        title: "Thank you for joining!",
      });

      window.location.reload();
      window.location.href = "/register?open=true";
    }
  };

  const mainSubmit = async (item) => {
    setbillingCompanyName(item?.billingCompanyName);
    setBillingState(item?.billingState);
    setBillingCity(item?.billingCity);
    setBillingCountry(item?.billingCountry);
    setBillingPostalCode(item?.billingPostalCode);
    setBillingAddressOne(item?.billingAddressOne);
    setBillingAddressTwo(item?.billingAddressTwo);
    setStreet(item?.street);
    setBillingAddressPhoneNumber(item?.billingPhoneNumber);
    setShippingCompanyName(item?.shippingCompanyName);
    setShippingState(item?.shippingState);
    setShippingCity(item?.shippingCity);
    setShippingCountry(item?.shippingCountry);
    setShippingPostalCode(item?.shippingPostalCode);
    setShippingAddressOne(item?.shippingAddressOne);
    setShippingAddressTwo(item?.shippingAddressTwo);
    setShippingAddressPhoneNumber(item?.shippingPhoneNumber);
    if (item?.sameWithBilling) {
      setToggleShippingAddress(true);
    } else {
      setToggleShippingAddress(false);
    }
  };

  return (
    <div className="md:container reg-stepper">
      <div className="md:max-w-[900px] w-full mx-auto">
        <div className="text-center">
          <h1 className="uppercase text-4xl">Create new account</h1>
        </div>
        <Separator className="bg-black my-10"></Separator>

        <div className="mx-auto">
          {stepperCurrent == 0 && (
            <>
              {role == 4 && (
                <ArtistInfo
                  role={role}
                  next={next}
                  nextArtistInfo={nextArtistInfo}
                  firstName={firstName}
                  bio={bio}
                  lastName={lastName}
                  websiteUrl={websiteUrl}
                  email={email}
                  confirmEmail={confirmEmail}
                  password={password}
                  confirmPassword={confirmPassword}
                  facebookLink={facebookLink}
                  instagramLink={instagramLink}
                  portfolioLink={portfolioLink}
                  linkendInLink={linkendInLink}
                  avatar={avatar}
                />
              )}
              {role == 3 && (
                <UserInfo
                  role={role}
                  next={next}
                  nextAddressInfo={nextAddressInfo}
                  firstName={firstName}
                  lastName={lastName}
                  jobTitle={jobTitle}
                  businessType={businessType}
                  websiteUrl={websiteUrl}
                  email={email}
                  confirmEmail={confirmEmail}
                  password={password}
                  confirmPassword={confirmPassword}
                />
              )}
            </>
          )}
          {stepperCurrent == 1 && (
            <Address
              next={next}
              prev={prev}
              email={email}
              registerUser={RegisterUser}
              mainSubmit={mainSubmit}
              billingCompanyName={billingCompanyName}
              billingState={billingState}
              billingCity={billingCity}
              billingCountry={billingCountry}
              billingPostalCode={billingPostalCode}
              billingAddressOne={billingAddressOne}
              street={street}
              billingAddressTwo={billingAddressTwo}
              shippingCompanyName={shippingCompanyName}
              shippingState={shippingState}
              shippingCity={shippingCity}
              shippingCountry={shippingCountry}
              shippingPostalCode={shippingPostalCode}
              shippingAddressOne={shippingAddressOne}
              shippingAddressTwo={shippingAddressTwo}
              shippingPhoneNumber={shippingPhoneNumber}
              billingPhoneNumber={billingPhoneNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationStepper;
