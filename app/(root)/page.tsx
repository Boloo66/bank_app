import HeaderBox from "../../components/HeaderBox";
import RightSideBar from "../../components/RightSideBar";
import TotalBalanceBox from "../../components/TotalBalance";

export default function Home() {
  const loggedIn = { firstName: "John", lastName: "Doe" }; // Example user object, replace with actual user data
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Explore our features and get started"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar user={loggedIn} transactions={[]} banks={[{}, {}]} />
    </section>
  );
}
