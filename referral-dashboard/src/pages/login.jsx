import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const submitForm = async e => {
    e.preventDefault();

    const userDetails = {
      email,
      password,
    };

    const response = await fetch(
      "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }
    );

    const data = await response.json();

    if (response.ok) {
      Cookies.set("jwt_token", data.data.token);

      navigate("/");
    } else {
      setErrorMsg(data.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Go Business</h1>

      <p>
        Sign in to open your referral dashboard.
      </p>

      <form onSubmit={submitForm}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Sign in
        </button>

        <p>{errorMsg}</p>
      </form>
    </div>
  );
}

export default Login;