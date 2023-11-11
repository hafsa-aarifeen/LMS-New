import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConfirmationPage = () => {
  const { email } = useParams();
  const [confirmationStatus, setConfirmationStatus] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/confirm-email/${email}`
        );
        setConfirmationStatus(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    confirmEmail();
  }, [email]);

  return (
    <div>
      <h2>Email Confirmation</h2>
      <p>{confirmationStatus}</p>
    </div>
  );
};

export default ConfirmationPage;
