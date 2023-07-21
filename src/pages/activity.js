import React from "react";
import Navbar from "../components/Navbar";
import Company from "../components/Company";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { ChevronsDownLeft } from "tabler-icons-react";

const Activity = () => {
  const router = useRouter();
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const [userId, setUserId] = useState("");
  const [dealId, setDealId] = useState("");
  // const [deal, setDeal] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    setUserId(router.query.userId);
    setDealId(router.query.dealId);
    async function getDeal() {
      console.log("in deal funcn")
      const deal = await fetch(`${BACK_END_URL}/dealActivity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dealId:dealId,
          userId:userId
        }),
      }).then((res) => res.json());
      console.log(deal)
    }
    // const deal = getDeal();
    // console.log(deal)
    getDeal()
  },[]);
  return (
    <div>
      <Navbar
        type="activity"
        />
      <Company />
    </div>
  );
};

export default Activity;
