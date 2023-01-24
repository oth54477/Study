import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/coin";
import Coins from "./routes/coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
