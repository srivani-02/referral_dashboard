import { Link } from "react-router-dom";


import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 2;
  const logout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  useEffect(() => {
    const getDashboardData = async () => {
      const token = Cookies.get("jwt_token");

      const response = await fetch(
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      } else {
        setErrorMsg(result.message || "Something went wrong");
      }

      setLoading(false);
    };

    getDashboardData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (errorMsg) {
    return <h1>{errorMsg}</h1>;
  }
  const filteredReferrals = [...data.referrals]
  .filter(each =>
    each.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

const totalPages = Math.ceil(
  filteredReferrals.length / itemsPerPage
);

const displayedReferrals = filteredReferrals.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <div style={{padding: "20px"}}>
      <nav>
        <h2>Go Business</h2>

        <button onClick={logout}>
          Log out
        </button>
      </nav>

      <h1>Referral Dashboard</h1>

      <p>
        Track your referrals, earnings,
        and partner activity in one place.
      </p>
      

      <h2>Overview</h2>
{data.metrics.map(each => (
  <div key={each.id}>
    <p>{each.label}</p>
    <h3>{each.value}</h3>
  </div>
))}
<h2>Service Summary</h2>

<p>
  <strong>Service:</strong> {data.serviceSummary.service}
</p>

<p>
  <strong>Your Referrals:</strong> {data.serviceSummary.yourReferrals}
</p>

<p>
  <strong>Active Referrals:</strong> {data.serviceSummary.activeReferrals}
</p>

<p>
  <strong>Total Earnings:</strong> {data.serviceSummary.totalRefEarnings}
</p>

<h2>Referral Information</h2>

<p>
  <strong>Referral Code:</strong> {data.referral.code}
</p>

<p>
  <strong>Referral Link:</strong> {data.referral.link}

</p>
<select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
>
  <option value="asc">A-Z</option>
  <option value="desc">Z-A</option>
</select>
<h2>Search Referrals</h2>

<input
  type="text"
  placeholder="Search by name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<h2>Referrals</h2>

{displayedReferrals
  .map(each => (
  <div key={each.id}>
    <Link
      to={`/referral/${each.id}`}
      state={{ referral: each }}
    >
      <h3>{each.name}</h3>
    </Link>

    <p>Service: {each.serviceName}</p>
    <p>Date: {each.date}</p>
    <p>Profit: {each.profit}</p>

    <hr />
  </div>
))}
<button
  disabled={currentPage === 1}
  onClick={() => setCurrentPage(currentPage - 1)}
>
  Previous
</button>

<span> Page {currentPage} of {totalPages} </span>

<button
  disabled={currentPage === totalPages}
  onClick={() => setCurrentPage(currentPage + 1)}
>
  Next
</button>

   </div>
  );
}
export default Dashboard;