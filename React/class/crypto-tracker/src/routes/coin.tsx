import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Price from "./Price";
import Chart from "./Chart";

interface RouteParams {
  coinId: string;
}

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  align-items: center;
  padding: 0px 5vw;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* width: 80vw; */
  /* height: 10vh; */
  background-color: #151515;
  border-radius: 25px;
  padding: 10px 20px;
  /* margin: 5vh 0vw; */
`;

const OverViewItem = styled.span`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    &:first-child {
      font-size: 13px;
      font-weight: 400;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    /* text-align: center; */
    /* display: block; */
  }
`;

const Description = styled.p`
  margin: 20px 10vw;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  background-color: #151515;
  padding: 7px, 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  console.log(priceMatch);
  useEffect(() => {
    (async () => {
      const infoData = await axios(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const priceData = await axios(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      console.log(infoData.data);
      setInfo(infoData.data);
      setPriceInfo(priceData.data);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>RANK:</span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>SYMBOL:</span>
              <span>{info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>OPEN SOURCE:</span>
              <span>{info?.open_source ? "YES" : "NO"}</span>
            </OverViewItem>
          </OverView>
          <Description>
            <span>{info?.description}</span>
          </Description>
          <OverView>
            <OverViewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>MAX SUPPLY:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
