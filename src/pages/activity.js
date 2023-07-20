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
      const deal = await fetch(`${BACK_END_URL}/dealActivity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          userId,
          dealId,
        },
      }).then((res) => res.json());

      return deal
    }
    const deal = getDeal();
    console.log(deal)
  });
  return (
    <div>
      <Company />
    </div>
  );
};

export default Activity;
