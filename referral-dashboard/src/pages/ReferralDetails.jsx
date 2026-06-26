import { useLocation } from "react-router-dom";

function ReferralDetails() {
  const location = useLocation();

  const referral = location.state?.referral;

  if (!referral) {
    return <h1>No referral data found</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Referral Details</h1>

      <p>
        <strong>Name:</strong> {referral.name}
      </p>

      <p>
        <strong>Service:</strong> {referral.serviceName}
      </p>

      <p>
        <strong>Date:</strong> {referral.date}
      </p>

      <p>
        <strong>Profit:</strong> {referral.profit}
      </p>
    </div>
  );
}

export default ReferralDetails;