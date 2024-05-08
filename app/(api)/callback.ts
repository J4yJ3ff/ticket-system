// pages/api/example.js

fetch("https://ticket-system-orpin.vercel.app/callback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    if (!res.ok) {
      console.log("Problem");
      return;
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
