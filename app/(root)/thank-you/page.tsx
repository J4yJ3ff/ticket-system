"use client";
import { useRouter } from "next/router";

const ThankYouPage = () => {
  const router = useRouter();
  const { email, name } = router.query;

  return (
    <div>
      <h1>Thank You, {name}!</h1>
      <p>
        We have received your payment. A confirmation email has been sent to{" "}
        {email}.
      </p>
    </div>
  );
};

export default ThankYouPage;
