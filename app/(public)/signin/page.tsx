import LoginForm from "@/components/authForms/LoginForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      PAGE SIGN IN
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
