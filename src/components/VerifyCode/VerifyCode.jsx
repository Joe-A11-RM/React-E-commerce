import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [code, setCode] = useState();
  let navigate = useNavigate();
  const verifyCode = async (resetCode) => {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then((data) => {
        console.log(data);
        if (data.data.status == "Success") {
          navigate("/newpassword");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div className="container w-50 mt-5">
        <label htmlFor="resetCode" className="form-label">
          Please Enter Your Reset Code :
        </label>
        <input
          onChange={(e) => setCode(e.target.value)}
          type="text"
          className="form-control"
          id="resetCode"
          name="resetCode"
        />
        <button
          type="button"
          className="btn bg-main text-white mt-3"
          onClick={() => verifyCode(code)}
        >
          Next
        </button>
      </div>
    </>
  );
}
