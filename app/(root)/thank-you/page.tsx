interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = ({ searchParams }: PageProps) => {
  const email = searchParams.email;

  return (
    <div>
      <h1>Thank You, {email}!</h1>
      <p>
        We have received your payment. A confirmation email has been sent to{" "}
        {email}.
      </p>
    </div>
  );
};

export default ThankYouPage;
