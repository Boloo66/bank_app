import HeaderBox from "../../components/HeaderBox";
import RightSideBar from "../../components/RightSideBar";
import TotalBalanceBox from "../../components/TotalBalance";
import { getLoggedInUser } from "../../lib/actions/users.action";

export default async function Home() {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
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
