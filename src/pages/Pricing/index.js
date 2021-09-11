import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import moneyImg from "../../assets/art-9.png";
import { TopLayer } from "../../components/topLayer";
import { useAuth } from "../../context/authContext";
import { serverUrl, stripePriceId, subscriptionStatus } from "../../utils/info";

const Wrapper = styled.div``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;
const PricingCard = styled.div`
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  max-width: 250px;
  margin: 20px auto;
  padding: 20px 0 30px 0;
  > img {
    max-width: 100%;
    object-fit: cover;
  }
  > h3 {
    color: var(--primary-color);
  }
  > p {
    text-align: center;
  }
`;
const Button = styled.button`
  background: var(--primary-color);
  border: none;
  color: #fff;
  padding: 11px 25px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;
const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  padding: 20px 30px;
`;
export function Pricing(props) {
  const location = useLocation();
  const query = location.search.split("session_id")[1];
  const history = useHistory();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  console.log("Pricing")
    if (query && query.substr(1)) {
      console.log("Pricing1")
      const sessionId = query.substr(1);
      createNewSubsciption(sessionId);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const createNewSubsciption = async (sessionId) => {
    console.log({ sessionId, userId: user.id });
    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/new-subcription`, {
        sessionId: sessionId,
        userId: user.id,
      });
      if (res.data.stripeCustomerId) {
        user["stripeCustomerId"] = res.data.stripeCustomerId;
        user["stripeSubId"] = res.data.stripeSubId;
        user["expiresAt"] = res.data.expiresAt;
        user["subscriptionStatus"] = 2;
        setUser({ ...user });
        console.log(user);
      }
      history.replace({
        search: "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      history.replace({
        search: "",
      });
      setLoading(false);
    }
  };
  const gotToStripPayment = async () => {
    const url = window.location.href;
    try {
      setLoading(true);
      console.log("creating");
      const res = await axios.post(`${serverUrl}/create-checkout-session`, {
        domainUrl: url,
        priceId: stripePriceId,
      });
      console.log(res);
      window.location.href = res.data.redirectUrl;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const cancelSubscription = async () => {
    try {
      setLoading(true);
      console.log("creating");
      const res = await axios.post(`${serverUrl}/cancel-subcription`, {
        subId: user.stripeSubId,
        userId: user.id,
      });
      console.log(res);
      if (res.data.message === "done") {
        user["subscriptionStatus"] = 1;

        setUser({ ...user });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        {console.log(user)}
        <TopLayer text="Learning Section" />

        <Content>
          <PricingCard>
            <img src={moneyImg} alt="" />
            <h2>Basic</h2>
            <h3>$10 /Month</h3>
            <p>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </p>
          </PricingCard>
          <Card>
            {user.subscriptionStatus && user.subscriptionStatus !== subscriptionStatus.unsubscribed ? (
              <>
                <p>
                  <span>Expires At:</span>{" "}
                  {moment.unix(user.expiresAt).format("MMMM Do YYYY")}
                </p>
                <p>
                  <span>Note:</span>Please make sure you have enough balance in
                  your card before expiry date. Orelse your subcription will be
                  terminated.
                </p>
                {user.subscriptionStatus ===
                  subscriptionStatus.toBeUnsubscribed && (
                  <p style={{ color: "red" }}>
                    You will be unsubscribed at the end of your billing period.
                  </p>
                )}
              </>
            ) : (
              <p>
                <span>Note:</span>Subscribe to create kid account from my kid
                section and see content.
              </p>
            )}
            {user.subscriptionStatus === subscriptionStatus.subscribed ? (
              <Button onClick={cancelSubscription} disabled={loading}>
                {loading === false ? "Cancel Subscription" : "loading"}
              </Button>
            ) : user.subscriptionStatus ===
              subscriptionStatus.toBeUnsubscribed ? (
              <Button disabled={true}>Cancelled</Button>
            ) : (
              <Button onClick={gotToStripPayment} disabled={loading}>
                {loading === false ? "Subscribe" : "loading"}
              </Button>
            )}
          </Card>
        </Content>
      </Wrapper>
    </>
  );
}
