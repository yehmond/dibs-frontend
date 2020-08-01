import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import SmallCard from "./SmallCard";
import { searchStores } from "../../api/customer";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";

const NUM_SKELETONS = 12;
const useStyles = makeStyles((theme) => ({
    grid: {
        display: "grid",
        marginTop: "1rem",
        marginBottom: "4rem",
        gridTemplateColumns: "repeat(4, 23%)",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "repeat(3, 31%)",
        },
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 48.5%)",
        },
        [theme.breakpoints.down("xs")]: {
            gridTemplateColumns: "100%",
        },
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "3rem 1rem",
    },
}));

function getNSkeletons(num) {
    const skeletons = [];
    for (let i = 0; i < num; i++) {
        skeletons.push(
            <div key={i}>
                <Skeleton
                    variant="rect"
                    animation="wave"
                    height="23rem"
                    style={{
                        borderRadius: "7px",
                    }}
                />
                <Skeleton
                    variant="text"
                    animation="wave"
                    height="5rem"
                    style={{
                        borderRadius: "7px",
                        marginBottom: "2rem",
                    }}
                />
            </div>
        );
    }
    return skeletons;
}

export default function Recommendations() {
    const classes = useStyles();
    const [availableNowStores, setAvailableNowStores] = useState([]);
    const [recommendedStores, setRecommendedStores] = useState([]);
    const hour = new Date().getHours();

    useEffect(() => {
        if (hour >= 7 && hour < 19) {
            const availableNowQuery = {
                date: moment().add(1, "hour").toDate(),
                time: moment().add(1, "hour").toDate(),
                time_frame: 60,
            };
            searchStores(12, availableNowQuery).then((response) => {
                if (response) {
                    setAvailableNowStores(response.stores);
                }
            });
        }

        const recommendedQuery = {
            rating: 5,
            startIndex: Math.floor(Math.random() * 2),
        };
        searchStores(12, recommendedQuery).then((response) => {
            if (response) {
                setRecommendedStores(response.stores);
            }
        });
    }, []); //eslint-disable-line

    return (
        <div className={classes.container}>
            {/* Render Available Now only if time is between 7:00 and 19:00 */}
            {hour >= 7 && hour < 19 && (
                <>
                    <h1>Available Now</h1>
                    <div className={classes.grid}>
                        {availableNowStores.length > 0
                            ? availableNowStores.map(
                                  (
                                      {
                                          store_id,
                                          name,
                                          services,
                                          price,
                                          rating,
                                          address,
                                          city,
                                          province,
                                          picture,
                                          neighbourhood,
                                      },
                                      idx
                                  ) => {
                                      return (
                                          <SmallCard
                                              key={idx}
                                              shopId={store_id}
                                              name={name}
                                              services={services}
                                              price={price}
                                              rating={rating}
                                              address={address}
                                              city={city}
                                              province={province}
                                              picture={picture}
                                              neighbourhood={neighbourhood}
                                          />
                                      );
                                  }
                              )
                            : getNSkeletons(NUM_SKELETONS)}
                    </div>
                </>
            )}
            <>
                <h1>Recommended</h1>
                <div className={classes.grid}>
                    {recommendedStores && recommendedStores.length > 0
                        ? recommendedStores.map(
                              (
                                  {
                                      store_id,
                                      name,
                                      services,
                                      price,
                                      rating,
                                      address,
                                      city,
                                      province,
                                      picture,
                                      neighbourhood,
                                  },
                                  idx
                              ) => {
                                  return (
                                      <SmallCard
                                          key={idx}
                                          shopId={store_id}
                                          name={name}
                                          services={services}
                                          price={price}
                                          rating={rating}
                                          address={address}
                                          city={city}
                                          province={province}
                                          picture={picture}
                                          neighbourhood={neighbourhood}
                                      />
                                  );
                              }
                          )
                        : getNSkeletons(NUM_SKELETONS)}
                </div>
            </>
        </div>
    );
}
