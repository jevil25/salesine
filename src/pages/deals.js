import { Paper, Text, Button, LoadingOverlay } from "@mantine/core";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/deals.module.css";
import Navbar from "../components/Navbar";
import activity from "../../public/assets/activity.png";
import sample from "../../public/assets/sample.png";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import moment from "moment/moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export const options = {
  maintainAscpectRatio: false,
  hover: {
    mode: "dataset",
    intersect: false,
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const Deals = () => {
  const router = useRouter();
  const [crmData, setcrmData] = useState([]);
  const [email, setEmail] = useState("");
  const [crmstatus, setCrmstatus] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const BACK_END_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const graphinfo = {
    activity: {
      data: {
        labels,
        datasets: [
          {
            fill: true,
            data: labels.map(() =>
              faker.datatype.number({ min: 0, max: 1000 })
            ),
            backgroundColor: "#E5EFFF",
            hoverBackgroundColor: "#3F51B5",
          },
        ],
      },
    },
  }

  useEffect(() => {
    setLoading(true);
    async function getopp() {
      const email = localStorage.getItem("email");
      setEmail(email);
      const data = await fetch(`${BACK_END_URL}/crm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          flag: "listopp",
        }),
      }).then((res) => res.json())
      // console.log(data);
      // setcrmData(data.data.data)
      // console.log(crmData)
      if (data.message == "Integrate your CRM") {
        // console.log("yooo");
        setLoading(false);
      } else {
        const crminfo = data.data.data
        console.log(crminfo);
        setcrmData(crminfo);
        setCrmstatus(true);
        setUser(data.user);
        setLoading(false);
      }
    }
    getopp();
  }, []);

  const handleClick = () => router.push('/settings')

  const formatDate = moment().format("LL");
  return (<>
    <LoadingOverlay visible={loading} />
    <div className={styles.dealsApp}>
      <Navbar type="deals" />

      <div className={styles.dealsWrapper}>
        <div className={styles.dealsWrapperComponent1}>
          <div className={styles.dealsWrapperComponent1stats}>
            <div className={styles.statsName}>Total Deals</div>
            <div className={styles.statsCount}>{user.activeDeals + user.closedDeals}</div>
          </div>
          <div className={styles.dealsWrapperComponent1stats}>
            <div className={styles.statsName}>Closed Deals</div>
            <div className={styles.statsCount}>{user.closedDeals}</div>
          </div>
          <div className={styles.dealsWrapperComponent1stats}>
            <div className={styles.statsName}>Active Deals</div>
            <div className={styles.statsCount}>{user.activeDeals}</div>
          </div>
        </div>
        <div className={styles.dealsWrapperComponent2}>
          <div className={styles.dealsWrapperComonent2Filter}>
            <div className={styles.date}>{formatDate}</div>
          </div>
          <div className={styles.dealsWrapperComonent2Parameter}>
            <div className={styles.parameter} style={{ flex: 2 }}>
              <div className={styles.parameterName}>Name(Client)</div>
            </div>
            <div className={styles.parameter} style={{ flex: 4 }}>
              <img src={activity} alt="" />
              <div className={styles.parameterName}>Activity</div>
            </div>
            <div className={styles.parameter} style={{ flex: 1 }}>
              <div className={styles.parameterName}>Next Call</div>
            </div>
            <div className={styles.parameter} style={{ flex: 1 }}>
              <div className={styles.parameterName}>Amount</div>
            </div>
            <div className={styles.parameter} style={{ flex: 1 }}>
              <div className={styles.parameterName}>Status</div>
            </div>
            <div className={styles.parameter} style={{ flex: 1 }}>
              <div className={styles.parameterName}>Close Date</div>
            </div>
            <div className={styles.parameter} style={{ flex: 1 }}>
              <div className={styles.parameterName}>Owner</div>
            </div>
            <div className={styles.parameter} style={{ flex: 2 }}>
              <div className={styles.parameterName}>Send to Team</div>
            </div>
          </div>
          <div className={styles.dealsWrapperComonent2Details}>
            {crmstatus ? (
              crmData.map((val) => (
                <div className={styles.dataWrapper}>
                  <div
                    className={styles.nameData}
                    style={{ flex: 2, justifyContent: "space-evenly" }}
                  >
                    <img src={val.img} alt="" />
                    <div className={styles.Dataname}>{val.title}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 4 }}>
                    <div className={styles.areaChart}>
                      <Line
                        data={graphinfo.activity.data}
                        options={options}
                        height="40px"
                      />
                    </div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>
                    {/* {val.nextCall} */}
                    Tomorrow
                    </div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.monetary_amount
}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.pipeline_stage_id
}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.close_date}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 1 }}>
                    <div className={styles.Dataname}>{val.owner_id}</div>
                  </div>
                  <div className={styles.nameData} style={{ flex: 2 }}>
                    <div className={styles.buttonWrapper}>
                      <div className={styles.sendButton}>
                        <div className={styles.sendButtonName}>Send to</div>
                        <img
                          src="https://img.icons8.com/material-sharp/14/000000/sort-down.png"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Paper
                style={{ display: "flex", justifyContent: "center" }}
                withBorder
                shadow="md"
                p={30}
                mt={30}
                radius="md"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    maxWidth: "50vw",
                    columnGap: "7vw",
                  }}
                >
                  <Text style={{ whiteSpace: "nowrap" }} align="center">
                    Integrate your desired CRM with Salesine to access this page
                  </Text>
                  <Button
                    fullWidth
                    mt="sm"
                    size="sm"
                    color="indigo"
                    style={{ width: "10vw" }}
                    onClick={handleClick}
                  >
                    Settings
                  </Button>
                </div>
              </Paper>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Deals;
