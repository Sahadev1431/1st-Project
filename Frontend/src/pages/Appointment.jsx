import React from "react";
import AppintmentForm from "../Components/AppintmentForm";
import Hero from "../Components/Hero";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appintment | E-Care Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppintmentForm />
    </>
  );
};

export default Appointment;
